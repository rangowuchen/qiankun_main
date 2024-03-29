/*
 * @Author: wuchen
 * @Date: 2021-11-29 11:41:37
 * @LastEditors: wuchen
 * @LastEditTime: 2021-11-30 11:11:31
 * @Description: 
 * @Email: rangowu@163.com
 */
// 集中导出mock数据
import Mock from 'mockjs'

import appConfig from './appConfig'

const mocks = [{
  intercept: true,
  fetchs: [...appConfig]
}];

export function param2Obj(url) {
  const search = url.split('?')[1]
  if (!search) {
    return {}
  }
  return JSON.parse(
    '{"' +
    decodeURIComponent(search)
    .replace(/"/g, '\\"')
    .replace(/&/g, '","')
    .replace(/=/g, '":"')
    .replace(/\+/g, ' ') +
    '"}'
  )
}

export function mockXHR() {
  // mock patch
  // https://github.com/nuysoft/Mock/issues/300
  Mock.XHR.prototype.proxy_send = Mock.XHR.prototype.send
  Mock.XHR.prototype.send = function () {
    if (this.custom.xhr) {
      this.custom.xhr.withCredentials = this.withCredentials || false

      if (this.responseType) {
        this.custom.xhr.responseType = this.responseType
      }
    }
    this.proxy_send(...arguments)
  }

  function XHR2ExpressReqWrap(respond) {
    return function (options) {
      let result = null
      if (respond instanceof Function) {
        const {
          body,
          type,
          url
        } = options
        // https://expressjs.com/en/4x/api.html#req
        result = respond({
          method: type,
          body: JSON.parse(body),
          query: param2Obj(url)
        })
      } else {
        result = respond
      }
      return Mock.mock(result)
    }
  }

  for (const i of mocks) {
    if (i.intercept) {
      for (const fetch of i.fetchs) {
        Mock.mock(new RegExp(fetch.url), fetch.type || 'get', XHR2ExpressReqWrap(fetch.response))
      }
    }
  }
}