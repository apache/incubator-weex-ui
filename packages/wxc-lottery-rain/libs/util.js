/**
 * Created by Tw93 on 2017/6/26.
 */

export function isIOS () {
  let { platform } = weex.config.env;
  return platform.toLowerCase() === 'ios';
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
