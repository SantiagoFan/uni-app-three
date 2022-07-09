import getSkeletonUtils from '@/common/jsm/utils/SkeletonUtils.js';
import getGLTFLoader from '@/common/jsm/loaders/GLTFLoader'
import { OrbitControls } from '@/common/jsm/controls/OrbitControls'


/**
 * 创建光系统 
 * @param {*} THREE 
 */
function createLight(THREE,worldScene){
    console.info("-- 创建灯光")
    var hemiLight = new THREE.HemisphereLight(0xffffff, 0x444444);
    hemiLight.position.set(0, 20, 0);
    worldScene.add(hemiLight);
    // 定线光
    var dirLight = new THREE.DirectionalLight(0xffffff);
    dirLight.position.set(- 3, 10, - 10);
    dirLight.castShadow = true;
    dirLight.shadow.camera.top = 10;
    dirLight.shadow.camera.bottom = - 10;
    dirLight.shadow.camera.left = - 10;
    dirLight.shadow.camera.right = 10;
    dirLight.shadow.camera.near = 0.1;
    dirLight.shadow.camera.far = 40;
    worldScene.add(dirLight);
}
/**
 * 创建地板
 * @param {*} THREE 
 * @returns 
 */
function createGround(THREE,worldScene){
    console.info("-- 创建地板")
    var groundMesh = new THREE.Mesh(
        new THREE.PlaneBufferGeometry(40, 40),
        new THREE.MeshPhongMaterial({
            color: 0x999999,
            depthWrite: false
        })
    );

    groundMesh.rotation.x = - Math.PI / 2;
    groundMesh.receiveShadow = true;
    worldScene.add(groundMesh);
    // // 纹理
    // const planeSize = 40;
    // const loader = new THREE.TextureLoader();
    // const texture = loader.load('http://static.card.nmgjoin.com/three/textures/checker.png');
    // texture.wrapS = THREE.RepeatWrapping;
    // texture.wrapT = THREE.RepeatWrapping;
    // texture.magFilter = THREE.NearestFilter;
    // const repeats = planeSize / 2;
    // texture.repeat.set(repeats, repeats);
    // // 地板网格
    // const planeGeo = new THREE.PlaneBufferGeometry(planeSize, planeSize);
    // const planeMat = new THREE.MeshPhongMaterial({
    //   map: texture,
    //   side: THREE.DoubleSide,
    // });
    // const mesh = new THREE.Mesh(planeGeo, planeMat);
    // mesh.rotation.x = Math.PI * -.5;
}



export default function (canvas, THREE) {
    let GLTFLoader = getGLTFLoader(THREE);
    let { SkeletonUtils } = getSkeletonUtils(THREE);
    let window = THREE.global;


    //////////////////////////////
    // 全局变量
    //////////////////////////////
    var worldScene = null; // THREE.Scene where it all will be rendered
    var renderer = null;
    var camera = null;
    var controls = null;
    var clock = null;
    var mixers = []; // All the THREE.AnimationMixer objects for all the animations in the scene
    //////////////////////////////


    //////////////////////////////
    // Information about our 3D models and units
    //////////////////////////////

    // The names of the 3D models to load. One-per file.
    // A model may have multiple SkinnedMesh objects as well as several rigs (armatures). Units will define which
    // meshes, armatures and animations to use. We will load the whole scene for each object and clone it for each unit.
    // Models are from https://www.mixamo.com/
    var MODELS = [
        { name: "Soldier" },
    ];

    // Here we define instances of the models that we want to place in the scene, their position, scale and the animations
    // that must be played.
    var UNITS = [
        {
            modelName: "Soldier", // Will use the 3D model from file models/gltf/Soldier.glb
            meshName: "vanguard_Mesh", // Name of the main mesh to animate
            position: { x: 0, y: 2, z: 0 }, // Where to put the unit in the scene
            scale: 1, // Scaling of the unit. 1.0 means: use original size, 0.1 means "10 times smaller", etc.
            animationName: "Idle" // Name of animation to run
        },
        {
            modelName: "Soldier",
            meshName: "vanguard_Mesh",
            position: { x: 1, y: -2, z: 0 },
            scale: 2,
            animationName: "Walk"
        },
        {
            modelName: "Soldier",
            meshName: "vanguard_Mesh",
            position: { x: 1, y: 2, z: 0 },
            scale: 1,
            animationName: "Run"
        },
    ];

    //////////////////////////////
    // The main setup happens here
    // 核心启动
    //////////////////////////////
    var numLoadedModels = 0;
    initScene();
    initRenderer();
    loadModels();
    render();
    //////////////////////////////


    //////////////////////////////
    // Function implementations
    //////////////////////////////
    /**
     * Function that starts loading process for the next model in the queue. The loading process is
     * asynchronous: it happens "in the background". Therefore we don't load all the models at once. We load one,
     * wait until it is done, then load the next one. When all models are loaded, we call loadUnits().
     */
    function loadModels() {

        for (var i = 0; i < MODELS.length; ++i) {

            var m = MODELS[i];

            loadGltfModel(m, function () {

                ++numLoadedModels;

                if (numLoadedModels === MODELS.length) {

                    console.log("All models loaded, time to instantiate units...");
                    instantiateUnits();

                }

            });

        }

    }

    /**
     * Look at UNITS configuration, clone necessary 3D model scenes, place the armatures and meshes in the scene and
     * launch necessary animations
     */
    function instantiateUnits() {

        var numSuccess = 0;

        for (var i = 0; i < UNITS.length; ++i) {

            var u = UNITS[i];
            var model = getModelByName(u.modelName);
            if (model) {
                var clonedScene = SkeletonUtils.clone(model.scene);
                if (clonedScene) {
                    // THREE.Scene is cloned properly, let's find one mesh and launch animation for it
                    var clonedMesh = clonedScene.getObjectByName(u.meshName);
                    if (clonedMesh) {
                        var mixer = startAnimation(clonedMesh, model.animations, u.animationName);
                        // Save the animation mixer in the list, will need it in the animation loop
                        mixers.push(mixer);
                        numSuccess++;
                    }
                    // Different models can have different configurations of armatures and meshes. Therefore,
                    // We can't set position, scale or rotation to individual mesh objects. Instead we set
                    // it to the whole cloned scene and then add the whole scene to the game world
                    // Note: this may have weird effects if you have lights or other items in the GLTF file's scene!
                    worldScene.add(clonedScene);
                    if (u.position) {
                        clonedScene.position.set(u.position.x, u.position.y, u.position.z);
                    }
                    if (u.scale) {
                        clonedScene.scale.set(u.scale, u.scale, u.scale);
                    }
                    if (u.rotation) {
                        clonedScene.rotation.x = u.rotation.x;
                        clonedScene.rotation.y = u.rotation.y;
                        clonedScene.rotation.z = u.rotation.z;
                    }
                }
            } else {
                console.error("Can not find model", u.modelName);
            }
        }
        console.log(`Successfully instantiated ${numSuccess} units`);
    }

    /**
     * Start animation for a specific mesh object. Find the animation by name in the 3D model's animation array
     * @param skinnedMesh {THREE.SkinnedMesh} The mesh to animate
     * @param animations {Array} Array containing all the animations for this model
     * @param animationName {string} Name of the animation to launch
     * @return {THREE.AnimationMixer} Mixer to be used in the render loop
     */
    function startAnimation(skinnedMesh, animations, animationName) {

        var mixer = new THREE.AnimationMixer(skinnedMesh);
        var clip = THREE.AnimationClip.findByName(animations, animationName);

        if (clip) {

            var action = mixer.clipAction(clip);
            action.play();

        }

        return mixer;

    }

    /**
     * Find a model object by name
     * @param name
     * @returns {object|null}
     */
    function getModelByName(name) {

        for (var i = 0; i < MODELS.length; ++i) {

            if (MODELS[i].name === name) {

                return MODELS[i];

            }

        }

        return null;

    }

    /**
     * Load a 3D model from a GLTF file. Use the GLTFLoader.
     * @param model {object} Model config, one item from the MODELS array. It will be updated inside the function!
     * @param onLoaded {function} A callback function that will be called when the model is loaded
     */
    function loadGltfModel(model, onLoaded) {

        var loader = new GLTFLoader();
        var modelName = "models/gltf/" + model.name + ".glb";

        loader.load("http://static.card.nmgjoin.com/three/" + modelName, function (gltf) {

            var scene = gltf.scene;

            model.animations = gltf.animations;
            model.scene = scene;

            // Enable Shadows

            gltf.scene.traverse(function (object) {

                if (object.isMesh) {

                    object.castShadow = true;

                }

            });

            console.log("Done loading model", model.name);

            onLoaded();

        });

    }

    /**
     * Render loop. Renders the next frame of all animations
     */
    function render() {
        canvas.requestAnimationFrame(render);
        // 获取自上一帧以来所经过的时间  更新动画帧
        var mixerUpdateDelta = clock.getDelta();
        for (var i = 0; i < mixers.length; ++i) {
            mixers[i].update(mixerUpdateDelta);
        }
        controls.update();
        renderer.render(worldScene, camera);
    }

    //////////////////////////////
    // General Three.JS stuff
    //////////////////////////////
    // This part is not anyhow related to the cloning of models, it's just setting up the scene.

    /**
     * Initialize ThreeJS scene renderer
     */
    function initRenderer() {
         // 创建渲染器
        renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.gammaOutput = true;
        renderer.gammaFactor = 2.2;
        renderer.shadowMap.enabled = true;
        renderer.shadowMap.type = THREE.PCFSoftShadowMap;

        // 创建控制器
        controls = new OrbitControls(camera, renderer.domElement);
    }

    /**
     * Initialize ThreeJS THREE.Scene
     */
    function initScene() {

        camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 10000);
        camera.position.set(3, 6, - 10);
        camera.lookAt(0, 1, 0);

        clock = new THREE.Clock();

        worldScene = new THREE.Scene();
        worldScene.background = new THREE.Color(0xa0a0a0);
        worldScene.fog = new THREE.Fog(0xa0a0a0, 10, 22);

        createLight(THREE,worldScene) // 灯光
        createGround(THREE,worldScene) // ground 地面
        
        window.addEventListener('resize', onWindowResize, false);
    }

    /**
     * 每当浏览器窗口调整大小时都会调用的回调函数。
     */
    function onWindowResize() {

        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);

    }
}