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
      { text: '指引', link: '/guide/', activeMatch: '/guide/' },
    ],
    sidebar: {
      '/guide/': [
        {
          text: '指引',
          items: [
            {
              text: '构建生产版本',
              link: '/guide/'
            }
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