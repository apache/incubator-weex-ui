/**
 * Created by Tw93 on 2017/6/26.
 */

export function compareVersion (currVer = "0.0.0", promoteVer = "0.0.0") {
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
}

export function isTrip () {
  let { appName } = weex.config.env;
  return appName === 'LX';
}

export function isAndroid () {
  let { platform } = weex.config.env;
  return platform.toLowerCase() === 'android';
}

export function isWeb () {
  let { platform } = weex.config.env;
  return typeof(window) === 'object' && platform.toLowerCase() === 'web';
}

export function getPageHeight () {
  const { env } = weex.config;
  const navHeight = isWeb() ? 0 : 130;
  return env.deviceHeight / env.deviceWidth * 750 - navHeight;
}
