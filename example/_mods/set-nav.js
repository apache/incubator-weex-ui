/**
 * Created by Tw93 on 2017/7/26.
 * demo设置标题和右上角按钮
 */
const navigationBar = weex.requireModule('navigationBar');
const navigator = weex.requireModule('navigator')

export function setTitle (title) {
  if (navigationBar && navigationBar.setTitle) {
    const NOOP = () => {
    };
    navigationBar.setTitle({
      title,
    }, NOOP, NOOP);

    const CALLBACK = (event) => {
      if (event.index != undefined) {
        navigator.push({
          url: 'https://h5.m.taobao.com/trip/weex-ui/index.html?_wx_tpl=https%3A%2F%2Fh5.m.taobao.com%2Ftrip%2Fweex-ui%2Fdemo%2Findex.native-min.js',
          animated: true
        }, NOOP)
      }
    };
    navigationBar.setRightItem({
      items: [{
        icon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAMAAABg3Am1AAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAABCUExURUxpcTMzMzMzMzAwMDIyMjIyMjExMTAwMDIyMjIyMjIyMjIyMjIyMjIyMjIyMjMzMzIyMjAwMDMzMzMzMzIyMjMzMxR9TlYAAAAVdFJOUwCgvzCfgD9AYMCQcO+P389/IG9Q0HT9VioAAADRSURBVEjH7ZXrDoMgDEZhVgFvu/L+r7pZgQlSLcuSJYvfHwKcU5HUKMSRj6P7Xhfx9hVdyBcYjmcbyEvJNmZeCK7hea5xCTzPgAXPMZCv3/M9A1b7aAx83hnA54XoSAOI82rCAPL98gZs3EfOgM37Wxuwc9+pgTw0V4qvGoiM1vd/l+fDfusW/NyOeaEPgFswyUI1nObckoLGl1BTHkEYbXzGqYERiR9sgmCTknEHf0mo5+EQfiM0GOx1HM5+TglkcoIsFe5bgsp+iIpM9V+//CcugShOKAURTAAAAABJRU5ErkJggg=='
      }]
    }, CALLBACK, NOOP);
  }
}

