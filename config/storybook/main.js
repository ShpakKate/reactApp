module.exports = {
    stories: [
        '../../src/**/*.stories.@(js|jsx|ts|tsx)',
    ],
    addons: [
        '@storybook/addon-links',
        '@storybook/addon-essentials',
        '@storybook/addon-interactions',
        'storybook-addon-mock',
    ],
    framework: '@storybook/react',
    core: {
        builder: 'webpack5',
    },
    webpackFinal: async (config) => {
        config.resolve.alias = {
            ...config.resolve.alias,
            '@': path.resolve(__dirname, '../../src'),
            '@/entities': path.resolve(__dirname, '../../src/entities'),
            '@/shared': path.resolve(__dirname, '../../src/shared'),
            '@/app': path.resolve(__dirname, '../../src/app'),
            '@/features': path.resolve(__dirname, '../../src/features'),
            '@/pages': path.resolve(__dirname, '../../src/pages'),
            '@/widgets': path.resolve(__dirname, '../../src/widgets'),
        };

        return config;
    },
};
