import {
  defineConfig
} from 'vitepress'

import path from 'path'

export default defineConfig({
  base: '/article/',
  lang: 'zh-CN',
  title: 'Ding',
  description: 'Ding',
  themeConfig: {
    siteTitle: 'Ding',
    nav: [
      { text: 'JavaScript基础', link: '/JavaScript基础/代理与反射', activeMatch: '/JavaScript基础' },
    ],
    sidebar: {
      '/JavaScript基础/': [
        {
          text: 'JavaScript基础',
          items: [
            { text: '代理与反射', link: '/JavaScript基础/代理与反射' },
            { text: '继承与原型', link: '/JavaScript基础/继承与原型' },
            { text: 'JavaScript中的二进制对象', link: '/JavaScript基础/JavaScript中的二进制对象' },
            { text: '对象模型-执行模型', link: '/JavaScript基础/对象模型-执行模型' },
            { text: '其他', link: '/JavaScript基础/其他' },
          ]
        }
      ]
    }
  },
  outDir: path.resolve(__dirname, '../../dist/article/'),
  markdown: {
    anchor: true,
    lineNumbers: true
  },

})