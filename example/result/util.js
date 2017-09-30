/**
 * Created by Tw93 on 2017/7/17.

 */

export function getBundleParam (param) {
  const { bundleUrl } = weex.config;
  let value = bundleUrl.match(new RegExp('[\?\&]' + param + '=([^\&\#]*)([\&\#]?)', 'i'));
  return value ? decodeURIComponent(value[1]) : value;
}
