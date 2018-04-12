/**
 * CopyRight (C) 2017-2022 Alibaba Group Holding Limited.
 * Created by Tw93 on 18/03/22
 */
import Binding from 'weex-bindingx/lib/index.weex.js';
import Utils from './index';

console.log(1111)
const BindEnv = {
  supportsEB () {
    return Binding.isSupportBinding && !Utils.env.isWeb();
  },

  /**
   * 判断Android容器是否支持是否支持expressionBinding(处理方式很不一致)
   * @returns {boolean}
   */
  supportsEBForAndroid () {
    return (Utils.env.isAndroid()) && BindEnv.supportsEB();
  },

  /**
   * 判断IOS容器是否支持是否支持expressionBinding
   * @returns {boolean}
   */
  supportsEBForIos () {
    return (Utils.env.isIOS()) && BindEnv.supportsEB();
  }
}

export default BindEnv;
