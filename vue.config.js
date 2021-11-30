/*
 * @Author: wuchen
 * @Date: 2021-11-29 11:41:37
 * @LastEditors: wuchen
 * @LastEditTime: 2021-11-29 17:21:40
 * @Description: 
 * @Email: rangowu@163.com
 */

const port = 6650; // dev port
let styleVariables = require('./src/style/variables.scss.js');

module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? '/' : '/',
  assetsDir: "assets",
  devServer: {
    // host: '0.0.0.0',
    hot: true,
    disableHostCheck: true,
    port,
    overlay: {
      warnings: false,
      errors: true
    },
    headers: {
      'Access-Control-Allow-Origin': '*',
    }
  },
  css: {
    loaderOptions: {
      sass: {
        prependData: Object.keys(styleVariables)
          .map(k => `\$${k.replace('_', '-')}: ${styleVariables[k]};`)
          .join('\n')
      }
    }
  }
};
