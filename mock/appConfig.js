/*
 * @Author: wuchen
 * @Date: 2021-11-29 11:41:37
 * @LastEditors: wuchen
 * @LastEditTime: 2021-11-30 10:31:30
 * @Description: 
 * @Email: rangowu@163.com
 */

const appConfig = [
  {
    id: "1",
    title: "子应用一",
    icon: "el-icon-s-data",
    module: "qiankun_app1",//和子应用中package.json的name保持一致
    defaultRegister: true,
    devEntry: "//localhost:6651",
    depEntry: "/child_app1/",//生产环境通过nginx转发(若直接访问链接地址可能会引起跨域)
    routerBase: "/app1",
    children: [
      {
        id: "1-1",
        title: "表格",
        url: "/app1/table"
      },
      {
        id: "1-2",
        title: "日历",
        url: "/app1/about"
      }
    ]
  },
  {
    id: "2",
    title: "子应用二",
    icon: "el-icon-s-promotion",
    module: "subapp-blog",
    defaultRegister: false,
    devEntry: "//localhost:6652",
    depEntry: "/child_app2/",
    routerBase: "/blog",
    children: [
      {
        id: "2-1",
        title: "报表",
        url: "/blog"
      },
      {
        id: "2-2",
        title: "穿梭框",
        url: "/blog/about"
      }
    ]
  }
]

export default [
  {
    url: '/Api/GetAppConfigs',
    type: 'post',
    response: () => {
      return {
        code: 200,
        data: appConfig
      }
    }
  },
]
