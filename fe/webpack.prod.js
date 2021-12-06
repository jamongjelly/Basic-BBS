const { merge } = require('webpack-merge');
const TerserWebpackPlugin = require('terser-webpack-plugin');
const common = require('./webpack.common');

const config = {
    mode: 'production',
    devtool: 'source-map',
    optimization: {
        runtimeChunk: {
            name: 'runtime',
        },
        splitChunks: {
            chunks: 'all',
            cacheGroups: {
                commons: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'venders',
                    chunks: 'all',
                },
            },
        },
        minimize: true,
        minimizer: [new TerserWebpackPlugin()],
    },
};

module.exports = merge(common);
