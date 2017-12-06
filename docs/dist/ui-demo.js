var $ = window.jQuery;
var HOME_URL = 'https://h5.m.taobao.com/trip/weex-ui/index.html?_wx_tpl=https%3A%2F%2Fh5.m.taobao.com%2Ftrip%2Fweex-ui%2Fdemo%2Findex.native-min.js';
document.addEventListener('DOMContentLoaded', function () {
  $('#J_qrcode').qrcode({
    text: HOME_URL,
    width: 200,
    height: 200
  });
  $('#J_return').on('click', e => {
    $('#J_frame').attr('src', HOME_URL);
  });
});
