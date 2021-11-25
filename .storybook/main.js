module.exports = {
  stories: [
    '../Ui-components/*/*.stories.mdx',
    '../Ui-components/*/*.stories.@(js|jsx|ts|tsx)'
  ],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    'storybook-css-modules-preset'
  ]
};
