const projectMeta = require('../package.json')

const siteConfig = {
  title: `${projectMeta.name} v${projectMeta.version}`, // Title for your website.
  tagline: projectMeta.description,
  url: 'https://kamataryo.github.io', // Your website URL
  baseUrl: '/jqf/', // Base URL for your project */
  // Used for publishing and more
  projectName: 'jqf',
  organizationName: 'kamataryo',
  headerLinks: [
    { doc: 'doc1', label: 'Install' },
    { doc: 'doc2', label: 'API' },
    { page: 'help', label: 'Help' },
    { blog: true, label: 'Blog' }
  ],

  /* path to images for header/footer */
  headerIcon: 'img/jqf-white.svg',
  footerIcon: 'img/jqf-white.svg',
  favicon: 'img/jqf.png',

  /* Colors for website */
  colors: {
    primaryColor: '#2E5585',
    secondaryColor: '#203B5C'
  },

  // This copyright info is used in /core/Footer.js and blog RSS/Atom feeds.
  copyright: `Copyright © ${new Date().getFullYear()} kamataryo`,

  highlight: {
    // Highlight.js theme to use for syntax highlighting in code blocks.
    theme: 'default',
    defaultLang: 'shell-session'
  },

  // On page navigation for the current documentation page.
  onPageNav: 'separate',
  // No .html extensions for paths.
  cleanUrl: true,

  // Open Graph and Twitter card images.
  ogImage: 'img/ogimage.png',
  twitterImage: 'img/ogimage.png',
  facebookAppId: '343450729823411'
  // Show documentation's last contributor's name.
  // enableUpdateBy: true,

  // Show documentation's last update time.
  // enableUpdateTime: true,

  // You may provide arbitrary config keys to be used as needed by your
  // template. For example, if you need your repo's URL...
  //   repoUrl: 'https://github.com/facebook/test-site',
}

module.exports = siteConfig
