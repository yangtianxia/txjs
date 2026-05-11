import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'TxJS',
  description: '一套简洁实用的 TypeScript 函数库',
  lang: 'zh-CN',

  themeConfig: {
    nav: [
      { text: '首页', link: '/' },
      { text: '文档', link: '/packages/bool' },
      {
        text: '相关项目',
        items: [
          { text: 'ua-browser', link: 'https://yangtianxia.github.io/ua-browser/' },
          { text: 'image-to-base64', link: 'https://yangtianxia.github.io/image-to-base64/' },
        ],
      },
      {
        text: 'GitHub',
        link: 'https://github.com/yangtianxia/txjs',
      },
    ],

    sidebar: [
      {
        text: '@txjs/bool',
        collapsed: false,
        items: [
          { text: '介绍', link: '/packages/bool' },
          { text: '类型判断', link: '/packages/bool#类型判断' },
          { text: '字符串与对象', link: '/packages/bool#字符串与对象' },
          { text: '格式校验', link: '/packages/bool#格式校验' },
        ],
      },
      {
        text: '@txjs/bem',
        collapsed: false,
        items: [
          { text: '介绍', link: '/packages/bem' },
          { text: '基础用法', link: '/packages/bem#基础用法' },
          { text: '修饰符', link: '/packages/bem#修饰符' },
          { text: 'CSS Modules', link: '/packages/bem#css-modules-模式' },
          { text: 'API', link: '/packages/bem#api' },
        ],
      },
      {
        text: '@txjs/shared',
        collapsed: false,
        items: [
          { text: '介绍', link: '/packages/shared' },
          { text: '对象操作', link: '/packages/shared#对象操作' },
          { text: '数组', link: '/packages/shared#数组' },
          { text: '字符串与数字', link: '/packages/shared#字符串与数字' },
          { text: '异步与流程控制', link: '/packages/shared#异步与流程控制' },
        ],
      },
      {
        text: '@txjs/types',
        collapsed: false,
        items: [
          { text: '介绍', link: '/packages/types' },
          { text: '工具类型', link: '/packages/types#类型' },
        ],
      },
    ],

    search: {
      provider: 'local',
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/yangtianxia/txjs' },
    ],

    footer: {
      message: 'MIT License',
      copyright: 'Copyright © yangtianxia',
    },

    outline: {
      label: '本页目录',
      level: [2, 3],
    },

    docFooter: {
      prev: '上一页',
      next: '下一页',
    },
  },
})
