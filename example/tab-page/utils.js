/**
 * 工具方法库
 * @namespace Utils
 * @example
 *
 * const { Utils } = require('@ali/wxv-bridge');
 */

const Utils = {
  /**
   * 环境判断辅助 API
   * @namespace Utils.env
   * @example
   *
   * const { Utils } = require('@ali/wxv-bridge');
   * const { env } = Utils;
   */
  isString (obj) {
    return typeof(obj) === 'string';
  },
  isNonEmptyArray (obj = []) {
    return obj && obj.length > 0 && Array.isArray(obj) && typeof obj !== 'undefined';
  },
  env: {

    /**
     * 是否是手淘容器
     * @method
     * @memberOf Utils.env
     * @returns {boolean}
     * @example
     *
     * const isTaobao = env.isTaobao();
     */
    isTaobao () {
      let { appName } = weex.config.env;
      return /(tb|taobao|淘宝)/i.test(appName);
    },


    /**
     * 是否是旅客容器
     * @memberOf Utils.env
     * @method
     * @returns {boolean}
     * @example
     *
     * const isTrip = env.isTrip();
     */
    isTrip () {
      let { appName } = weex.config.env;
      return appName === 'LX';
    },
    /**
     * 是否是 web 环境
     * @memberOf Utils.env
     * @method
     * @returns {boolean}
     * @example
     *
     * const isWeb = env.isWeb();
     */
    isWeb () {
      let { platform } = weex.config.env;
      return typeof(window) === 'object' && platform.toLowerCase() === 'web';
    },
    /**
     * 是否是 iOS 系统
     * @memberOf Utils.env
     * @method
     * @returns {boolean}
     * @example
     *
     * const isIOS = env.isIOS();
     */
    isIOS () {
      let { platform } = weex.config.env;
      return platform.toLowerCase() === 'ios';
    },
    /**
     * 是否是 Android 系统
     * @memberOf Utils.env
     * @method
     * @returns {boolean}
     * @example
     *
     * const isAndroid = env.isAndroid();
     */
    isAndroid () {
      let { platform } = weex.config.env;
      return platform.toLowerCase() === 'android';
    },

    /**
     * 是否是支付宝容器
     * @memberOf Utils.env
     * @method
     * @returns {boolean}
     * @example
     *
     * const isAlipay = env.isAlipay();
     */
    isAlipay () {
      let { appName } = weex.config.env;
      return appName === 'AP';
    },

    /**
     * 是否是支付宝H5容器(防止以后支付宝接入weex)
     * @memberOf Utils.env
     * @method
     * @returns {boolean}
     * @example
     *
     * const isAlipayWeb = env.isAlipayWeb();
     */
    isAlipayWeb () {
      return Utils.env.isAlipay() && Utils.env.isWeb();
    },


    /**
     * 判断是否支持expressionBinding
     * 当weex版本大于0.10.1.6，为客户端即可以支持expressionBinding
     * @returns {Boolean}
     */
    supportsEB () {
      const weexVersion = weex.config.env.weexVersion || '0';
      const isHighWeex = Utils.compareVersion(weexVersion, '0.10.1.4') && (Utils.env.isIOS() || Utils.env.isAndroid());
      const expressionBinding = weex.requireModule('expressionBinding');
      return expressionBinding && expressionBinding.enableBinding && isHighWeex;
    },

    /**
     * 判断Android容器是否支持是否支持expressionBinding(处理方式很不一致)
     * @returns {boolean}
     */
    supportsEBForAndroid () {
      return (Utils.env.isAndroid()) && Utils.env.supportsEB();
    },

    /**
     * 判断IOS容器是否支持是否支持expressionBinding
     * @returns {boolean}
     */
    supportsEBForIos () {
      return (Utils.env.isIOS()) && Utils.env.supportsEB();
    },

    /**
     * 获取weex屏幕真实的设置高度，需要减去导航栏高度
     * @returns {Number}
     */
    getPageHeight () {
      const { env } = weex.config;
      const navHeight = Utils.env.isWeb() ? 0 : 130;
      return env.deviceHeight / env.deviceWidth * 750 - navHeight;
    }
  },

  /**
   * 版本号比较
   * @memberOf Utils
   * @param currVer {string}
   * @param promoteVer {string}
   * @returns {boolean}
   * @example
   *
   * const { Utils } = require('@ali/wx-bridge');
   * const { compareVersion } = Utils;
   * console.log(compareVersion('0.1.100', '0.1.11')); // 'true'
   */
  compareVersion (currVer = "0.0.0", promoteVer = "0.0.0") {
    if (currVer === promoteVer) return true;
    const currVerArr = currVer.split(".");
    const promoteVerArr = promoteVer.split(".");
    const len = Math.max(currVerArr.length, promoteVerArr.length);
    for (let i = 0; i < len; i++) {
      let proVal = ~~promoteVerArr[i];
      let curVal = ~~currVerArr[i];
      if (proVal < curVal) {
        return true;
      } else if (proVal > curVal) {
        return false;
      }
    }
    return false;
  },
  truncateString (str, len, hasDot = true) {
    let newLength = 0;
    let newStr = "";
    let singleChar = '';
    const chineseRegex = /[^\x00-\xff]/g;
    const strLength = str.replace(chineseRegex, '**').length;
    for (let i = 0; i < strLength; i++) {
      singleChar = str.charAt(i).toString();
      if (singleChar.match(chineseRegex) !== null) {
        newLength += 2;
      } else {
        newLength++;
      }
      if (newLength > len) {
        break;
      }
      newStr += singleChar;
    }

    if (hasDot && strLength > len) {
      newStr += '...';
    }
    return newStr;
  },
};

module.exports = Utils;
