// 获取url参数
export const getQueryString = (name) => {
  const reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
  // const search = window.location.search.split('?')[1] || '';
  const href = window.location.href.split("?")[1] || "";
  const r = href.match(reg) || [];
  return r[2];
};
// 邮箱
export const isEmail = (s) => {
  return /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((.[a-zA-Z0-9_-]{2,3}){1,2})$/.test(
    s
  );
};
// 手机号码
export const isMobile = (s) => {
  return /^1[0-9]{10}$/.test(s);
};
// 电话号码
export const isPhone = (s) => {
  return /^([0-9]{3,4}-)?[0-9]{7,8}$/.test(s);
};
// 身份证
export const isCardNo = (card) => {
  // 身份证号码为15位或者18位，15位时全为数字，18位前17位为数字，最后一位是校验位，可能为数字或字符X
  var reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
  return reg.test(card);
};
// 是否url地址
export const isURL = (s) => {
  return /^http[s]?:\/\/.*/.test(s);
};
// 是否字符串
export const isString = (o) => {
  return Object.prototype.toString.call(o).slice(8, -1) === "String";
};
// 是否数字
export const isNumber = (o) => {
  return Object.prototype.toString.call(o).slice(8, -1) === "Number";
};
// 是否boolean
export const isBoolean = (o) => {
  return Object.prototype.toString.call(o).slice(8, -1) === "Boolean";
};
// 是否函数
export const isFunction = (o) => {
  return Object.prototype.toString.call(o).slice(8, -1) === "Function";
};
// 是否undefined
export const isUndefined = (o) => {
  return Object.prototype.toString.call(o).slice(8, -1) === "Undefined";
};

// 移除参数为空的值
export const removeParamEmpty = (param) => {
  for (let key in param) {
    if (param[key] === "") {
      delete param[key];
    }
  }
};

/**
 * 获取一个目标元素的高度
 * @param elClass 类名
 * @param dataVal data中定义的属性
 */
export function getElRect(elClass) {
  return new Promise((resolve, reject) => {
    const query = uni.createSelectorQuery().in(this);
    query
      .select("." + elClass)
      .fields({ size: true }, (res) => {
        // 如果节点尚未生成，res值为null，循环调用执行
        console.log("data", res);
      })
      .exec();
  });
}

/**
 * @desc 函数防抖
 * @param func 目标函数
 * @param wait 延迟执行毫秒数
 */
export function debounce(func, wait) {
  let timeout = null;
  return function() {
    let context = this;
    let args = arguments;
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => {
      func.apply(context, args);
    }, wait);
  };
}

/**
 * @desc 函数节流
 * @param func 函数
 * @param wait 延迟执行毫秒数
 */
export function throttle(func, wait) {
  let timeout = null;
  return function() {
    let context = this;
    let args = arguments;
    if (!timeout) {
      timeout = setTimeout(() => {
        timeout = null;
        func.apply(context, args);
      }, wait);
    }
  };
}
export const callback = (url) => {
  let reg = new RegExp("(%2F)", "g"); //g代表全部
  let reg1 = new RegExp("(%3F)", "g"); //g代表全部
  let reg2 = new RegExp("(%3D)", "g"); //g代表全部
  let newMsg = url.replace(reg, "/");
  console.log(newMsg);
  let newMsg2 = newMsg.replace(reg1, "?");
  console.log(newMsg2);
  let newMsg3 = newMsg2.replace(reg2, "=");
  return newMsg3;
};
