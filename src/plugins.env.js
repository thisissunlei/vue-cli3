const envs = {
  'development': {
    'plugins': 'http://op.krspace.cn',
  },
  'test01': {
    'plugins': 'http://optest01.krspace.cn',
  },
  'test02': {
    'plugins': 'http://optest02.krspace.cn',
  },
  'test03': {
    'plugins': 'http://optest03.krspace.cn',
  },
  'test04': {
    'plugins': 'http://optest04.krspace.cn',
  },
  'test05': {
    'plugins': 'http://optest05.krspace.cn',
  },
  'test06': {
    'plugins': 'http://optest06.krspace.cn',
  },
  'test07': {
    'plugins': 'http://optest07.krspace.cn',
  },
  'test08': {
    'plugins': 'http://optest08.krspace.cn',
  },
  'dev01': {
    'plugins': 'http://dev01.krspace.cn',
  },
  'dev02': {
    'plugins': 'http://dev02.krspace.cn',
  },
  'production': {
    'plugins': '',
  },
};

const time = (new Date()).getTime();
const pluginsDomain = envs[process.env.NODE_ENV].plugins + '/plugins';

const jsFiles = [
  pluginsDomain + '/nav/1.0.0/nav.js' + '?version=' + time,
  'https://web.krspace.cn/kr-op/echarts/4.1.0/echarts.min.js',
  'https://web.krspace.cn/kr-op/umeditor/1.0.0/ueditor.config.js',
  'https://web.krspace.cn/kr-op/umeditor/1.0.0/ueditor.all.js',
  'https://web.krspace.cn/kr-op/umeditor/1.0.0/lang/zh-cn/zh-cn.js',
  'https://web.krspace.cn/kr-op/go/1.8.14/go.js',
  'https://web.krspace.cn/plugins/watermark.js',
  ' https://web.krspace.cn/kr-op/gt/1.0.0/gt.js ',
  // 百度地图
  'https://api.map.baidu.com/api?v=2.0&ak=FqwyBT0DR8BunOKYZ0ABDoWU',
  'https://web.krspace.cn/kr-op/baiduMap/bmap.min.js',

  // 私有
  // 高德地图
  'https://cache.amap.com/lbs/static/es5.min.js',
  'https://webapi.amap.com/maps?v=1.4.9&key=392b034f6d43dfa089a147a1282468d5&plugin=AMap.Geocoder,AMap.MarkerClusterer',
  'https://webapi.amap.com/ui/1.0/main.js',
  // 动画库
  'https://web.krspace.cn/kr-op/TweenMax/1.20.3/TweenMax.min.js'
];

const cssFiles = [
  pluginsDomain + '/nav/1.0.0/nav.css',
  pluginsDomain + '/public/css/main.css',
];

module.exports = {
  jsFiles,
  cssFiles,
  pluginsDomain
};

