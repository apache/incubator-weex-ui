/**
 * CopyRight (C) 2017-2022 Alibaba Group Holding Limited.
 * Created by Tw93 on 2017-7-18.
 */

const path = require('path');
const pkg = require('./package.json');

const webpack = require('webpack');
const glob = require('glob');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const os = require('os');
const HappyPack = require('happypack');
const happyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length });
HappyPack.SERIALIZABLE_OPTIONS = HappyPack.SERIALIZABLE_OPTIONS.concat([
  'postcss'
]);

console.log('Building..., Please wait a moment.');

const getEntry = dir => {
  const foundScripts = glob.sync(`${dir}/*/index.js`, {});
  // 生成 entry 映射表
  const ret = {};
  foundScripts.forEach(function(scriptPath) {
    if (!/\.entry\.js$/.test(scriptPath)) {
      ret[scriptPath.replace(/^(.*)\.js$/, '$1')] = './' + scriptPath;
    }
  });
  return ret;
};

const getCopyConfig = () => {
  const foundScripts = glob.sync('example/*/', {});
  const ret = [];
  foundScripts.forEach(scriptPath => {
    if (!/(_mods|_public)/.test(scriptPath)) {
      ret.push({
        from: 'example/_public/index.html',
        to: scriptPath + 'index.html'
      });
    }
  });
  return ret;
};

const example = getEntry('example');
const entry = Object.assign(
  {
    index: './index.js'
  },
  example
);

const plugins = [
  new CleanWebpackPlugin(['build'], {
    verbose: true
  }),
  new webpack.optimize.CommonsChunkPlugin({
    async: 'shared-module',
    minChunks: (module, count) => count >= 2
  }),
  new HappyPack({
    id: 'babel',
    verbose: true,
    loaders: ['babel-loader?cacheDirectory=true'],
    threadPool: happyThreadPool
  }),
  new HappyPack({
    id: 'css',
    verbose: true,
    cache: false,
    loaders: ['postcss-loader'],
    threadPool: happyThreadPool
  }),
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: JSON.stringify('production')
    },
    global: '{}'
  }),
  new webpack.BannerPlugin({
    banner: '// { "framework": "Vue" }\n',
    raw: true
  }),
  new CopyWebpackPlugin(getCopyConfig(), { copyUnmodified: true })
];

const needClean = process.argv.indexOf('--watch') > -1;
needClean && plugins.shift();

const getBaseConfig = () => ({
  cache: true,
  devtool: '#source-map',
  entry,
  context: __dirname,
  output: {
    path: path.join(__dirname, 'build'),
    publicPath: '/',
    filename: '[name].js',
    libraryTarget: 'umd',
    library: `npm/${pkg.name}/[name]`,
    umdNamedDefine: false
  },
  stats: {
    colors: true,
    modules: false,
    reasons: false
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: 'happypack/loader?id=babel',
        exclude: /node_modules/
      },
      {
        test: /\.vue(\?[^?]+)?$/,
        use: []
      },
      {
        test: /\.css$/,
        use: 'happypack/loader?id=css'
      }
    ]
  },
  plugins,
  resolve: {
    extensions: ['.js'],
    modules: ['node_modules']
  }
});

const webCfg = getBaseConfig();
webCfg.output.filename = '[name].web.js';
webCfg.module.rules[1].use.push({
  loader: 'vue-loader',
  options: {
    optimizeSSR: false,
    loaders: {
      js: 'happypack/loader?id=babel'
    },
    compilerModules: [
      {
        postTransformNode: el => {
          require('weex-vue-precompiler')()(el);
        }
      }
    ]
  }
});

const nativeCfg = getBaseConfig();
nativeCfg.output.filename = '[name].native.js';
nativeCfg.module.rules[1].use.push('weex-loader');

const exportConfig = [webCfg, nativeCfg];

module.exports = exportConfig;
