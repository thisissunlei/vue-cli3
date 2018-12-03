const AutoDynamicPlugin = require('auto-dynamic-routes');
const pluginEnvs = require('./src/plugins.env');
const path = require('path');
const resolve = (dir) => path.join(__dirname, dir);
// const vConsolePlugin = require('vconsole-webpack-plugin'); // 引入 移动端模拟开发者工具 插件 （另：https://github.com/liriliri/eruda）

const IS_PROD = ['production', 'prod'].includes(process.env.NODE_ENV);
console.log('is_prod', IS_PROD)
const baseUrl = IS_PROD ? "/project-vue/" : "/";

//Webpack包文件分析器
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin'); //Gzip


module.exports = {
  // 部署应用包时的基本 URL
  baseUrl: baseUrl,
  // 输出文件目录
  outputDir: process.env.outputDir || 'dist',
  // eslint-loader 是否在保存的时候检查
  // lintOnSave: true,
  // 放置生成的静态资源 (js、css、img、fonts) 的 (相对于 outputDir 的) 目录。
  assetsDir: 'static',
  // 以多页模式构建应用程序。
  pages: undefined,
  //是否使用包含运行时编译器的 Vue 构建版本
  runtimeCompiler: false,
  // 是否为 Babel 或 TypeScript 使用 thread-loader。该选项在系统的 CPU 有多于一个内核时自动启用，仅作用于生产构建，在适当的时候开启几个子进程去并发的执行压缩
  parallel: require('os').cpus().length > 1,
  //生产环境是否生成 sourceMap 文件，一般情况不建议打开
  productionSourceMap: false,

  // webpack配置
  //对内部的 webpack 配置进行更细粒度的修改 https://github.com/neutrinojs/webpack-chain see https://github.com/vuejs/vue-cli/blob/dev/docs/webpack.md
  chainWebpack: config => {
    /**
     * 删除懒加载模块的prefetch，降低带宽压力
     * https://cli.vuejs.org/zh/guide/html-and-static-assets.html#prefetch
     * 而且预渲染时生成的prefetch标签是modern版本的，低版本浏览器是不需要的
     */
    config.plugins.delete('prefetch');
    config
      .plugin('html')
      .tap(args => {
        args[0].files = {
          js: pluginEnvs.jsFiles,
          css: pluginEnvs.cssFiles
        };
        return args
      });
    //if(process.env.NODE_ENV === 'production') { // 为生产环境修改配置...process.env.NODE_ENV !== 'development'
    //} else {// 为开发环境修改配置...
    //}

    config.module
      .rule('images')
      .use('url-loader')
      .loader('url-loader')
      .tap(options => Object.assign(options, {limit: 10240}))

    config.resolve.alias
      .set('@', resolve('src'))
      .set('assets', resolve('src/assets'))
      .set('components', resolve('src/components'))
      .set('images', resolve('src/assets/images'))
      .set('views', resolve('src/views'))
      .set('plugins', resolve('src/plugins'))
  },
  transpileDependencies: ['iview'],
  //调整 webpack 配置 https://cli.vuejs.org/zh/guide/webpack.html#%E7%AE%80%E5%8D%95%E7%9A%84%E9%85%8D%E7%BD%AE%E6%96%B9%E5%BC%8F
  configureWebpack: config => {

    // 防止将某些 import 的包(package)打包到 bundle 中
    config.externals = {
      // 'vue': 'Vue',
      // 'element-ui': 'ELEMENT',
      // 'vue-router': 'VueRouter',
      // 'vuex': 'Vuex',
      // 'axios': 'axios'
    }

    // 基本插件
    let pluginsBase = [
      new AutoDynamicPlugin({
        inPath: path.resolve(__dirname, './src/views'),
        srcDir: 'views'
      })
    ];

    //生产and测试环境
    let pluginsPro = [
      new UglifyJsPlugin({
        uglifyOptions: {
          compress: {
            warnings: false,
            drop_console: true,
            drop_debugger: false,
            pure_funcs: ['console.log']//移除console
          }
        },
        sourceMap: false,
        parallel: true
      }),
      new CompressionPlugin({ //文件开启Gzip，也可以通过服务端(如：nginx)(https://github.com/webpack-contrib/compression-webpack-plugin)
        filename: '[path].gz[query]',
        algorithm: 'gzip',
        test: /\.(js|css|json|txt|html|ico|svg)(\?.*)?$/i,
        threshold: 8192,
        minRatio: 0.8,
      }),
    ];
    //开发环境
    let pluginsDev = [
      //移动端模拟开发者工具(https://github.com/diamont1001/vconsole-webpack-plugin  https://github.com/Tencent/vConsole)
      // new vConsolePlugin({
      //   filter: [], // 需要过滤的入口文件
      //   enable: true // 发布代码前记得改回 false
      // }),
    ];

    if (IS_PROD) { // 为生产环境修改配置...process.env.NODE_ENV !== 'development'
      config.plugins = [...config.plugins, ...pluginsBase, ...pluginsPro];
    } else {
      // 为开发环境修改配置...
      config.plugins = [...config.plugins, ...pluginsBase, ...pluginsDev];
    }
    if (process.env.IS_ANALYZ) {
      //	Webpack包文件分析器(https://github.com/webpack-contrib/webpack-bundle-analyzer)
      config.plugins.push(new BundleAnalyzerPlugin())
    }
  },
  css: {
    // 启用 CSS modules
    modules: false,
    // 是否使用css分离插件，Default: 生产环境下是 true，开发环境下是 false
    // extract: true,
    // 开启 CSS source maps，一般不建议开启
    sourceMap: false,
    // css预设器配置项
    loaderOptions: {
      sass: {
        //设置css中引用文件的路径，引入通用使用的scss文件（如包含的@mixin）
        data: `
				$src: "${process.env.VUE_APP_SRC}";
				// @import '@/assets/scss/_common.scss';
				`
        //data: `
        //$baseUrl: "/";
        //`
      }
    }
  },
  // webpack-dev-server 相关配置 https://webpack.js.org/configuration/dev-server/
  devServer: {
    // host: '0.0.0.0',
    host: "project-vue.krspace.cn",
    port: 1998, // 端口号
    https: false, // https:{type:Boolean}
    open: true, //配置自动启动浏览器  http://172.16.1.12:7071/rest/mcdPhoneBar/
    hotOnly: true, // 热更新
    // proxy: 'http://localhost:8000'   // 配置跨域处理,只有一个代理
    proxy: { //配置自动启动浏览器
      "/api": {
        target: "http://op" + process.env.NODE_ENV + ".krspace.cn",
        changeOrigin: true,
        // ws: true,//websocket支持
        secure: false,
        pathRewrite: {
          '^/api': '/api'
        }
      },
      "/pbsevice/*": {
        target: "http://172.16.1.12:2018",
        changeOrigin: true,
        //ws: true,//websocket支持
        secure: false
      },
    },
    disableHostCheck: true,//授权的 host
    // historyApiFallback: {
    //   rewrites: [
    //     { from: /.*/, to: path.posix.join(config.dev.assetsPublicPath, 'index.html') },
    //   ],
    // },
    overlay: true // 当出现编译器错误或警告时，在浏览器中显示全屏覆盖层。
  },

  // 第三方插件配置 https://www.npmjs.com/package/vue-cli-plugin-style-resources-loader
  pluginOptions: {
    'style-resources-loader': {//https://github.com/yenshih/style-resources-loader
      preProcessor: 'scss',//声明类型
      'patterns': [
        //path.resolve(__dirname, './src/assets/scss/_common.scss'),
      ],
      //injector: 'append'
    }
  }
};
