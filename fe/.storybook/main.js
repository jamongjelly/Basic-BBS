const path = require('path');

const srcDir = path.resolve(__dirname, '../src');

module.exports = {
    stories: [
        '../src/stories/**/*.stories.mdx',
        '../src/stories/**/*.stories.@(js|jsx|ts|tsx)',
    ],
    addons: [
        '@storybook/addon-links',
        '@storybook/addon-essentials',
        'themeprovider-storybook/register',
    ],
    webpackFinal: async (config) => {
        config.resolve.modules.push(srcDir);
        config.resolve.alias = {
            ...(config.resolve.alias || {}),
            src: srcDir,
        };

        return config;
    },
};
