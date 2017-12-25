/**
 * CopyRight (C) 2017-2022 Alibaba Group Holding Limited.
 * Created by Tw93 on 2017/09/06.
 * 红包雨动画类
 */

const animation = weex.requireModule('animation');
import Utils from '../../utils';

const isIos = Utils.env.isIOS();

export function showPig (ref, duration, callback) {
  ref && animation.transition(ref, {
    styles: {
      transform: 'translate(0, -140px)',
      opacity: 1
    },
    duration,
    timingFunction: 'ease-in'
  }, () => {
    callback && callback()
  })
}

export function hidePig (ref, duration, callback) {
  ref && animation.transition(ref, {
    styles: {
      transform: 'translate(0, 0)',
      opacity: 0
    },
    duration,
    timingFunction: 'ease-out'
  }, () => {
    callback && callback()
  })
}

export function shakePig (ref, callback) {
  const duration = isIos ? 20 : 10;
  ref && animation.transition(ref, {
    styles: {
      transform: 'rotate(12deg) translate(0, -140px)'
    },
    duration,
    timingFunction: 'ease-in'
  }, () => {
    animation.transition(ref, {
      styles: {
        transform: 'rotate(0) translate(0, -140px)'
      },
      duration,
      timingFunction: 'ease-out'
    }, () => {
      animation.transition(ref, {
        styles: {
          transform: 'rotate(-12deg) translate(0, -140px)'
        },
        duration,
        timingFunction: 'ease-in'
      }, () => {
        animation.transition(ref, {
          styles: {
            transform: 'rotate(0) translate(0, -140px)'
          },
          duration,
          timingFunction: 'ease-out'
        }, () => {
          callback && callback()
        })
      })
    })
  })
}
