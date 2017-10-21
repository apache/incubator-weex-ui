/**
 * 工具方法库
 * @namespace Utils
 */

const Utils = {
  isString (obj) {
    return typeof(obj) === 'string';
  },
  isNonEmptyArray (obj = []) {
    return obj && obj.length > 0 && Array.isArray(obj) && typeof obj !== 'undefined';
  },
  env: {
    isTaobao () {
      let { appName } = weex.config.env;
      return /(tb|taobao|淘宝)/i.test(appName);
    },
    isTrip () {
      let { appName } = weex.config.env;
      return appName === 'LX';
    },
    isWeb () {
      let { platform } = weex.config.env;
      return typeof(window) === 'object' && platform.toLowerCase() === 'web';
    },
    isIOS () {
      let { platform } = weex.config.env;
      return platform.toLowerCase() === 'ios';
    },
    isAndroid () {
      let { platform } = weex.config.env;
      return platform.toLowerCase() === 'android';
    },
    isAlipay () {
      let { appName } = weex.config.env;
      return appName === 'AP';
    },
    isAlipayWeb () {
      return Utils.env.isAlipay() && Utils.env.isWeb();
    },
    supportsEB () {
      const weexVersion = weex.config.env.weexVersion || '0';
      const isHighWeex = Utils.compareVersion(weexVersion, '0.10.1.4') && (Utils.env.isIOS() || Utils.env.isAndroid());
      const expressionBinding = weex.requireModule('expressionBinding');
      return expressionBinding && expressionBinding.enableBinding && isHighWeex;
    },
    supportsEBForAndroid () {
      return (Utils.env.isAndroid()) && Utils.env.supportsEB();
    },

    supportsEBForIos () {
      return (Utils.env.isIOS()) && Utils.env.supportsEB();
    },

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

export default Utils;
