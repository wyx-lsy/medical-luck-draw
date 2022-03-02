const path = require("path");
function resolve(dir) {
  return path.join(__dirname, dir); //path.join(__dirname)设置绝对路径
}
module.exports = {
  //基本路径
  publicPath: "/",
  //保存时lint代码
  lintOnSave: process.env.NODE_ENV !== "production",
  //生产环境 source map
  productionSourceMap: false,
  chainWebpack: (config) => {
    config.resolve.alias.set("@", resolve("./src"));
  },
  configureWebpack: (config) => {
    if (process.env.NODE_ENV === "production") {
      // 为生产环境修改配置...
      config.mode = "production";
    } else {
      // 为开发环境修改配置...
      config.mode = "development";
    }
  },
  devServer: {
    open: true,
    port: 8040,
    proxy: {
      "/api": {
        target: "http://192.168.3.14:8040/",
        changeOrigin: true,
        ws: true,
        pathRewrite: {
          "^/api": "",
        },
      },
    },
  },
};
