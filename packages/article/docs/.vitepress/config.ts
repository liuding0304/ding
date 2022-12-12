import {
  defineConfig
} from 'vitepress'

import path from 'path'

export default defineConfig({
  base: '/blog/',
  lang: 'zh-CN',
  title: 'Ding',
  description: 'Ding',
  themeConfig: {
    siteTitle: 'Ding',
    nav: [
      { text: 'JavaScript基础', link: '/JavaScript基础/index.html', activeMatch: '/JavaScript基础' },
    ],
    sidebar: {
      '/JavaScript基础/': [
        {
          text: 'JavaScript基础',
          items: [
            { text: '代理与反射', link: '/JavaScript基础/代理与反射.html' },
            { text: '继承与原型', link: '/JavaScript基础/继承与原型.html' },
            { text: 'JavaScript中的二进制对象', link: '/JavaScript基础/JavaScript中的二进制对象.html' },
            { text: '对象模型-执行模型', link: '/JavaScript基础/对象模型-执行模型.html' },
            { text: '其他', link: '/JavaScript基础/其他.html' },
          ]
        }
      ]
    }
  },
  outDir: path.resolve(__dirname, '../../dist/blog/'),
  markdown: {
    anchor: true,
    lineNumbers: true
  },

})