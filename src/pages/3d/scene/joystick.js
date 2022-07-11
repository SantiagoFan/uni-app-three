
import * as THREE from '@/common/three.weapp.js'
// import isTouchOutOfBounds from './helpers/isTouchOutOfBounds';
// import degreesToRadians from './helpers/degreesToRadians';
// import getPositionInScene from './helpers/getPositionInScene';

const isTouchOutOfBounds = (
  clientX,
  clientY,
  origin,
  perimeterSize,
) => {
  const xDelta = (clientX - origin.x);
  const yDelta = (clientY - origin.y);
  const xSquared = Math.pow(xDelta, 2);
  const ySquared = Math.pow(yDelta, 2);
  const distanceFromTheOrigin = Math.sqrt(xSquared + ySquared);

  return (perimeterSize <= distanceFromTheOrigin);
};

const degreesToRadians = (degrees)=> {
  return degrees * (Math.PI / 180);
};

const getPositionInScene = (  clientX,  clientY,  camera,  scale = 10,) => {
  let window = THREE.global;
  const relativeX = (clientX / window.innerWidth) * 2 - 1;
  const relativeY = -(clientY / window.innerHeight) * 2 + 1;

  const inSceneTouchVector = new THREE.Vector3(relativeX, relativeY, 0)
    .unproject(camera)
    .sub(camera.position)
    .normalize()
    .multiplyScalar(scale);

  return camera
    .position
    .clone()
    .add(inSceneTouchVector);
};



export class JoystickControls{

  constructor(camera,scene,domElement) {
    this.camera = camera;
    this.scene = scene;
    this.joystickTouchZone = 75;

    this.baseAnchorPoint = new THREE.Vector2(); //Anchor of the joystick base
    this. touchPoint = new THREE.Vector2(); // Current point of the joystick ball
    this.interactionHasBegan = false; //当用户交互时为真
    this.isJoystickAttached = false; // 当操纵杆连接到场景时是真
    this.joystickScale = 15; // 设置操纵杆比例将缩放操纵杆的大小
    this.domElement = domElement
    this.create();
  }

  preventAction =()=>{
    return false
  }

   /**
    * Touch start event listener
    */
   handleTouchStart = (event) => {
    console.info('---------handleTouchStart----------')
     if (this.preventAction()) {
       return;
     }
     const touch = event.touches[0];
 
     if (!touch) {
       return;
     }
 
     this.onStart(touch.clientX, touch.clientY);
   };
 
   /**
    * Mouse down event listener
    */
   handleMouseDown = (event) => {
     if (this.preventAction()) {
       return;
     }
 
     this.onStart(event.clientX, event.clientY);
   };
 
   /**
    * Plots the anchor point
    */
    onStart = (clientX, clientY) => {
     this.baseAnchorPoint = new THREE.Vector2(clientX, clientY);
     this.interactionHasBegan = true;
   };
 
   /**
    * Touch move event listener
    */
   handleTouchMove = (event) => {
     if (this.preventAction()) {
       return;
     }
 
     const touch = event.touches[0];
 
     if (touch) {
       this.onMove(touch.clientX, touch.clientY);
     }
   };
 
   /**
    * Mouse move event listener
    */
   handleMouseMove = (event) => {
     if (this.preventAction()) {
       return;
     }
     this.onMove(event.clientX, event.clientY);
   };
 
   /**
    * Updates the joystick position during user interaction
    */
   onMove = (clientX, clientY) => {
    console.info('------ on move')
     if (!this.interactionHasBegan) {
       return;
     }
 
     this.touchPoint = new THREE.Vector2(clientX, clientY);
 
     const positionInScene = getPositionInScene(
       clientX,
       clientY,
       this.camera,
       this.joystickScale,
     );
 
     if (!this.isJoystickAttached) {
       /**
        * If there is no base or ball, then we need to attach the joystick
        */
       return this.attachJoystick(positionInScene);
     }
 
     this.updateJoystickBallPosition(clientX, clientY, positionInScene);
   };
 
   /**
    * Handles the touchend and mouseup events
    */
   handleEventEnd = () => {
     if (!this.isJoystickAttached) {
       return;
     }
 
     this.onEnd();
   };
 
   /**
    * Clean up joystick when the user interaction has finished
    */
   onEnd = () => {
    console.info('--------隐藏')
     const joystickBase = this.scene.getObjectByName('joystick-base');
     const joyStickBall = this.scene.getObjectByName('joystick-ball');
 
     if (joystickBase){
         this.scene.remove(joystickBase);
     }
 
     if ( joyStickBall) {
       this.scene.remove(joyStickBall);
     }
 
     this.isJoystickAttached = false;
     this.interactionHasBegan = false;
   };
 
   /**
    * 绘制操纵杆基础和球
    *
    * TODO: Add feature to allow an image to be loaded.
    * TODO: Add option to change color and size of the joystick
    */
   attachJoystickUI = (name,position,color,size) => {
     const zoomScale = 1 / this.camera.zoom;
     const geometry = new THREE.CircleGeometry(size * zoomScale, 72);
     const material = new THREE.MeshLambertMaterial({
       color: color,
       opacity: 0.5,
       transparent: true,
       depthTest: false,
     });
     const uiElement = new THREE.Mesh(geometry, material);
 
     uiElement.renderOrder = 1;
     uiElement.name = name;
     uiElement.position.copy(position);
     this.scene.add(uiElement);
   };
 
   /**
    * 创建球和基础的操纵杆
    */
   attachJoystick = (positionInScene) => {
    console.info('--------显示')
     this.attachJoystickUI(
       'joystick-base',
       positionInScene,
       0xFF001E,
       0.9,
     );
     this.attachJoystickUI(
       'joystick-ball',
       positionInScene,
       0xCCCCCC,
       0.5,
     );
 
     this.isJoystickAttached = true;
   };
 
   /**
    * Calculates if the touch point was outside the joystick and
    * either returns the joystick ball position bound to the perimeter of
    * the base, or the position inside the base.
    */
   getJoystickBallPosition = (     clientX,     clientY,     positionInScene,   ) => {
     const touchWasOutsideJoystick = isTouchOutOfBounds(
       clientX,
       clientY,
       this.baseAnchorPoint,
       this.joystickTouchZone,
     );
 
     if (touchWasOutsideJoystick) {
       /**
        * Touch was outside Base so restrict the ball to the base perimeter
        */
       const angle = Math.atan2(
         clientY - this.baseAnchorPoint.y,
         clientX - this.baseAnchorPoint.x,
       ) - degreesToRadians(90);
       const xDistance = Math.sin(angle) * this.joystickTouchZone;
       const yDistance = Math.cos(angle) * this.joystickTouchZone;
       const direction = new THREE.Vector3(-xDistance, -yDistance, 0)
         .normalize();
       const joyStickBase = this.scene.getObjectByName('joystick-base');
 
       /**
        * positionInScene restricted to the perimeter of the joystick
        * base
        */
       return (joyStickBase).position.clone().add(direction);
     }
 
     /**
      * Touch was inside the Base so just set the joystick ball to that
      * position
      */
     return positionInScene;
   };
 
   /**
    * Attaches the joystick or updates the joystick ball position
    */
   updateJoystickBallPosition = (     clientX,     clientY,     positionInScene,   ) => {
     const joyStickBall = this.scene.getObjectByName('joystick-ball');
     const joystickBallPosition = this.getJoystickBallPosition(
       clientX,
       clientY,
       positionInScene,
     );
 
     /**
      * Inside Base so just copy the position
      */
     joyStickBall?.position.copy(joystickBallPosition);
   };
 
   /**
    * Calculates and returns the distance the user has moved the
    * joystick from the center of the joystick base.
    */
   getJoystickMovement = ()=> {
     if (!this.isJoystickAttached) {
       return null;
     }
 
     return {
       moveX: this.touchPoint.x - this.baseAnchorPoint.x,
       moveY: this.touchPoint.y - this.baseAnchorPoint.y,
     };
   };
 
   /**
    * Adds event listeners to the document
    */
   create = ()=> {
    console.info('操作杆 创建开始------')
     this.domElement.addEventListener('touchstart', this.handleTouchStart);
     this.domElement.addEventListener('touchmove', this.handleTouchMove);
     this.domElement.addEventListener('touchend', this.handleEventEnd);
     this.domElement.addEventListener('mousedown', this.handleMouseDown);
     this.domElement.addEventListener('mousemove', this.handleMouseMove);
     this.domElement.addEventListener('mouseup', this.handleEventEnd);
   };
 
   /**
    * Removes event listeners from the document
    */
   destroy = () => {
     this.domElement.removeEventListener('touchstart', this.handleTouchStart);
     this.domElement.removeEventListener('touchmove', this.handleTouchMove);
     this.domElement.removeEventListener('touchend', this.handleEventEnd);
     this.domElement.removeEventListener('mousedown', this.handleMouseDown);
     this.domElement.removeEventListener('mousemove', this.handleMouseMove);
     this.domElement.removeEventListener('mouseup', this.handleEventEnd);
   };
 
   /**
    * function that updates the positioning, this needs to be called
    * in the animation loop
    */
   update = (callback) => {
     const movement = this.getJoystickMovement();
     callback?.(movement);
   };
}