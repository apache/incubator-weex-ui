/**
 * CopyRight (C) 2017-2022 Alibaba Group Holding Limited.
 * Created by Tw93 on 2017/09/06.
 * 红包雨区域检测类
 */

import Utils from '../../utils';

const Region = {
  regions: [],
  isCross (region) {
    const { regions } = this;

    region.right = region.left + region.width;
    region.bottom = region.top + region.height;

    for (let i = 0; i < regions.length; i++) {
      const curRegion = regions[i];
      // 两区域相交
      curRegion.right = curRegion.left + curRegion.width;
      curRegion.bottom = curRegion.top + curRegion.height;
      if (!(region.left > curRegion.right || region.right < curRegion.left || region.bottom < curRegion.top || region.top > curRegion.bottom)) {
        return true;
      }
    }
    return false;
  },
  get (width, height) {
    if (!width || !height) {
      return;
    }
    let i = 1000;
    const viewWidth = 750;
    const viewHeight = Utils.env.getPageHeight();
    let wrapWidth = viewWidth - width;
    let wrapHeight = viewHeight - height - 140;
    wrapHeight = wrapHeight < 0 ? 0 : wrapHeight;
    wrapWidth = wrapWidth < 0 ? 0 : wrapWidth;

    const region = {
      left: '-9999px',
      top: '-9999px',
      width: width + 'px',
      height: height + 'px'
    };
    while (i--) {
      region.left = Math.round(Math.random() * wrapWidth) + 'px';
      region.top = Math.round(Math.random() * wrapHeight + height) + 'px';
      if (!this.isCross(region)) {
        this.add(region);
        return region;
      }
    }
  },
  buildRandom () {
    return new Date().getTime() + '_' + parseInt(Math.random() * 1000000);
  },
  add (region) {
    const { regions } = this;
    region.id = this.buildRandom();
    regions.push(region);
  },
  remove (region) {
    const { regions } = this;
    if (!region) return;
    for (let i = 0; i < regions.length; i++) {
      if (region.id === regions[i].id) {
        regions.splice(i, 1);
      }
    }
  }
};

export default Region;
