/**
 * Created by Tw93 on 2017/6/26.
 */
const UrlParser = require('url-parse');
const Utils = {
  UrlParser: UrlParser,
  /**
   * 对象类型
   * @memberOf Utils
   * @param obj
   * @returns {string}
   * @private
   */
  _typeof (obj) {
    return Object.prototype.toString.call(obj).slice(8, -1).toLowerCase();
  },

  /**
   * 判断 obj 是否为 `object`
   * @memberOf Utils
   * @param obj
   * @returns {boolean}
   * @example
   *
   * const { Utils } = require('@ali/wxv-bridge');
   * const { isPlainObject } = Utils;
   * console.log(isPlainObject({})); // true
   * console.log(isPlainObject('')); // false
   */
  isPlainObject (obj) {
    return Utils._typeof(obj) === 'object';
  },

  /**
   * 判断 obj 是否为 `string`
   * @memberOf Utils
   * @param obj
   * @returns {boolean}
   * @example
   *
   * const { Utils } = require('@ali/wxv-bridge');
   * const { isString } = Utils;
   * console.log(isString({})); // false
   * console.log(isString('')); // true
   */
  isString (obj) {
    return typeof(obj) === 'string';
  },

  /**
   * 判断 obj 是否为 `非空数组`
   * @memberOf Utils
   * @param obj
   * @returns {boolean}
   * @example
   *
   * const { Utils } = require('@ali/wxv-bridge');
   * const { isNonEmptyArray } = Utils;
   * console.log(isNonEmptyArray([])); // false
   * console.log(isNonEmptyArray([1,1,1,1])); // true
   */
  isNonEmptyArray (obj = []) {
    return obj && obj.length > 0 && Array.isArray(obj) && typeof obj !== 'undefined';
  },
  appendProtocol (url) {
    if (/^\/\//.test(url)) {
      const {
        bundleUrl
      } = weex.config;
      return `http${/^https:/.test(bundleUrl) ? 's' : ''}:${url}`;
    }
    return url;
  },
  encodeURLParams (url) {
    const parsedUrl = new UrlParser(url, true);
    return parsedUrl.toString();
  },
  goToH5Page (jumpUrl, animated = false, callback = null) {
    const Navigator = weex.requireModule('navigator');
    const jumpUrlObj = new Utils.UrlParser(jumpUrl, true);
    const url = Utils.appendProtocol(jumpUrlObj.toString());
    Navigator.push({
      url: Utils.encodeURLParams(url),
      animated: animated,
    }, callback);
  }
}
module.exports = Utils;
