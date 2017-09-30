/**
 * Created by Tw93 on 2017/6/26.
 */
const UrlParser = require('url-parse');
const Utils = {
  UrlParser: UrlParser,
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
    const  Navigator= weex.requireModule('navigator')
    const jumpUrlObj = new Utils.UrlParser(jumpUrl, true);
    const url = appendProtocol(jumpUrlObj.toString());
    Navigator.push({
      url: Utils.encodeURLParams(url),
      animated: animated,
    }, callback);
  }
}
module.exports = Utils;
