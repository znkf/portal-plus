const path = require("path")
const webpack = require("webpack")
const createThemeColorReplacerPlugin = require("./config/plugin.config")

function resolve(dir) {
  return path.join(__dirname, dir)
}

const isProd = process.env.NODE_ENV === "production"

const assetsCDN = {
  // webpack build externals
  externals: {
    // vue: "Vue",
    // "vue-router": "VueRouter",
    // vuex: "Vuex",
    // axios: "axios"
  },
  css: [],
  // https://unpkg.com/browse/vue@2.6.10/
  js: [
    "//cdn.jsdelivr.net/npm/vue@2.6.10/dist/vue.min.js",
    "//cdn.jsdelivr.net/npm/vue-router@3.1.3/dist/vue-router.min.js",
    "//cdn.jsdelivr.net/npm/vuex@3.1.1/dist/vuex.min.js",
    "//cdn.jsdelivr.net/npm/axios@0.19.0/dist/axios.min.js"
  ]
}

// vue.config.js
const vueConfig = {
  publicPath: "./",
  configureWebpack: {
    // webpack plugins
    plugins: [
      // Ignore all locale files of moment.js
      new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/)
    ],
    // if prod, add externals
    externals: isProd ? assetsCDN.externals : {}
  },

  chainWebpack: config => {
    config.resolve.alias.set("@$", resolve("src"))

    const svgRule = config.module.rule("svg")
    svgRule.uses.clear()
    svgRule
      .oneOf("inline")
      .resourceQuery(/inline/)
      .use("vue-svg-icon-loader")
      .loader("vue-svg-icon-loader")
      .end()
      .end()
      .oneOf("external")
      .use("file-loader")
      .loader("file-loader")
      .options({
        name: "assets/[name].[hash:8].[ext]"
      })

    // if prod is on
    // assets require on cdn
    // if (isProd) {
    //   config.plugin("html").tap(args => {
    //     args[0].cdn = assetsCDN
    //     return args
    //   })
    // }
  },

  css: {
    loaderOptions: {
      less: {
        modifyVars: {
          // less vars，customize ant design theme
          'primary-color': '#2e5aa6',
          'link-color': '#2e5aa6',
          'border-radius-base': '4px'
        },
        // DO NOT REMOVE THIS LINE
        javascriptEnabled: true
      }
    }
  },
  devServer: {
    port: 8000,
    host: "0.0.0.0",
    contentBase: "./dist",
    compress: true,
    historyApiFallback: true,
    disableHostCheck: true,
    headers: {
      "X-Custom-Foo": "bar",
      "Access-Control-Allow-Credentials": true,
      "Access-Control-Allow-Origin": "http://localhost:8001",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
      "Access-Control-Allow-Headers":
        "X-Requested-With, content-type, Authorization"
    },
    proxy: {
      '/amc/*': {
        target: 'https://test-changsha.0x5f81.cn/ebus/cssg_cards/api',
        changeOrigin: true,
        secure: false,
        pathRewrite: { "^/amc": "amc" }
      },
      '/gaio_order4outer_be/*': {
        target: 'http://smartgate.changsha.gov.cn/ebus/',
        changeOrigin: true,
        secure: false,
        pathRewrite: { "^/gaio_order4outer_be": "gaio_order4outer_be" }
      },
      '/cssg_gagrzzzz/*': {
        target: 'http://smartgate.changsha.gov.cn/ebus/',
        changeOrigin: true,
        secure: false,
        pathRewrite: { "^/cssg_gagrzzzz": "cssg_gagrzzzz" }
      }
    }
  },
  // disable source map in production
  productionSourceMap: false,
  lintOnSave: false,
  // babel-loader no-ignore node_modules/*
  transpileDependencies: []
}

// preview.pro.loacg.com only do not use in your production;
if (process.env.VUE_APP_PREVIEW === "true") {
  console.log("VUE_APP_PREVIEW", true)
  // add `ThemeColorReplacer` plugin to webpack plugins
  vueConfig.configureWebpack.plugins.push(createThemeColorReplacerPlugin())
}

module.exports = vueConfig
