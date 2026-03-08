import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'Quanty UI',
  description: 'Design system for quantitative finance Vue 3 apps',
  themeConfig: {
    nav: [
      { text: 'Guide', link: '/getting-started' },
      { text: 'Components', link: '/components/badge' },
      { text: 'GitHub', link: 'https://github.com/thibaudcocostegue/Quanty-ui' }
    ],
    sidebar: [
      {
        text: 'Introduction',
        items: [
          { text: 'Getting Started', link: '/getting-started' },
          { text: 'Tokens', link: '/tokens' }
        ]
      },
      {
        text: 'Typography',
        items: [
          { text: 'QuantHeading', link: '/components/heading' },
          { text: 'QuantText', link: '/components/text' },
          { text: 'QuantCode', link: '/components/code' }
        ]
      },
      {
        text: 'Components',
        items: [
          { text: 'QuantBadge', link: '/components/badge' },
          { text: 'QuantButton', link: '/components/button' },
          { text: 'QuantCard', link: '/components/card' },
          { text: 'QuantTable', link: '/components/table' }
        ]
      }
    ],
    socialLinks: [
      { icon: 'github', link: 'https://github.com/thibaudcocostegue/Quanty-ui' }
    ]
  }
})
