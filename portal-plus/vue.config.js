const autoprefixer = require("autoprefixer");
// const pxtorem = require("postcss-pxtorem");

module.exports = {
  outputDir: "dist",
  productionSourceMap: false,
  publicPath: process.env.NODE_ENV === "production" ? "./" : "/",
  devServer: {
    port: 8080,
    host: "0.0.0.0",
    contentBase: "./dist",
    compress: true,
    historyApiFallback: true,
    disableHostCheck: true,
    headers: {
      "X-Custom-Foo": "bar",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
      "Access-Control-Allow-Headers":
        "X-Requested-With, content-type, Authorization"
    },
    proxy: {
      "/znkf/exconfig/*": {
        target: "https://smartgate.changsha.gov.cn",
        changeOrigin: true,
        secure: false,
        pathRewrite: { "^/znkf/exconfig": "znkf/exconfig" }
      },
      "/znkf/*": {
        target: "https://smartgate.changsha.gov.cn",
        changeOrigin: true,
        secure: false,
        pathRewrite: { "^/znkf": "znkf" }
      },
    
      "/ws/*": {
        target: "http://apis.map.qq.com",
        changeOrigin: true,
        secure: false,
        pathRewrite: { "^/ws": "ws" }
      },
      "/ebus/cssg_kc_zwfwsxgl/*": {
        target: "https://smartgate.changsha.gov.cn",
        changeOrigin: true,
        secure: false,
        pathRewrite: { "^/ebus": "ebus" }
      },
      "/ebus/*": {
        target: "https://smartgate.changsha.gov.cn",
        changeOrigin: true,
        secure: false,
        pathRewrite: { "^/ebus": "ebus" }
      }
    }
  },
  css: {
    loaderOptions: {
      postcss: {
        plugins: [
          autoprefixer()
          // pxtorem({
          //   // rootValue: 37.5,
          //   propList: ["*"]
          // })
        ]
      }
    }
  }
};
