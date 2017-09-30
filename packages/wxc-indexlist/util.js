/**
 * 根据26个字母取每一项首字母对数据进行排序,处理数据变换
 * @param  {object}
 * @return {[array]}
 */
export function formatTotalList (source, hotListConfig, cityLocationConfig) {
  const LETTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const res = [];
  LETTERS.split('').forEach(letter => {
    const _data = source.filter(item => {
      if (item.pinYin) {
        return item.pinYin.slice(0, 1).toLowerCase() === letter.toLowerCase();
      } else if (item.py) {
        return item.py.slice(0, 1).toLowerCase() === letter.toLowerCase();
      } else {
        return false;
      }
    });
    if (_data.length) {
      res.push({
        title: letter,
        data: _data,
        type: 'list'
      });
    }
  });

  // 处理热门数据
  const hotList = getSpecialData(hotListConfig);
  hotList && res.unshift(hotList);

  // 处理特殊定位数据
  const cityLocation = getSpecialData(cityLocationConfig);
  cityLocation && res.unshift(cityLocation);

  return res;
}

/**
 * 分割数组
 * @param arr 被分割数组
 * @param size 分割数组的长度
 * @returns {Array}
 */
export function arrayChunk (arr = [], size = 4) {
  let groups = [];
  if (arr && arr.length > 0) {
    groups = arr.map((e, i) => {
      return i % size === 0 ? arr.slice(i, i + size) : null;
    }).filter(e => {
      return e;
    });
  }
  return groups;
}

export function getSpecialData (data) {
  if (data && data.type && data.list && data.list.length > 0) {
    const { type, title, list } = data;
    const res = {
      title,
      type,
      data: type === 'group' ? arrayChunk(list) : list,
    }
    return res;
  } else {
    return null;
  }
}

export function getPageHeight () {
  const { env } = weex.config;
  const navHeight = isWeb() ? 0 : 130;
  return env.deviceHeight / env.deviceWidth * 750 - navHeight;
}

export function isWeb () {
  let { platform } = weex.config.env;
  return typeof(window) === 'object' && platform.toLowerCase() === 'web';
}
