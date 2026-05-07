import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'TxJS',
  description: '一套简洁实用的 TypeScript 函数库',
  lang: 'zh-CN',

  themeConfig: {
    nav: [
      { text: '首页', link: '/' },
      { text: '文档', link: '/packages/validator/' },
      {
        text: 'GitHub',
        link: 'https://github.com/yangtianxia/txjs',
      },
    ],

    sidebar: [
      {
        text: '工具包',
        items: [
          { text: '@txjs/bool', link: '/packages/bool' },
          { text: '@txjs/bem', link: '/packages/bem' },
          { text: '@txjs/shared', link: '/packages/shared' },
          { text: '@txjs/types', link: '/packages/types' },
        ],
      },
      {
        text: '@txjs/validator',
        items: [
          { text: '介绍', link: '/packages/validator/' },
          { text: '内置规则', link: '/packages/validator/rules' },
          { text: 'AntdValidator', link: '/packages/validator/antd' },
          { text: 'VantValidator', link: '/packages/validator/vant' },
        ],
      },
    ],

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
