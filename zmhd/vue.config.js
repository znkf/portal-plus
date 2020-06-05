module.exports = {
  publicPath: './',
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
      '/ping/*': {
        target: 'http://zwfw-new.hunan.gov.cn',
        changeOrigin: true,
        secure: false,
        pathRewrite: { "^/ping": "ping" }
      }
    }
  }
}