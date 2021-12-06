const { merge } = require('webpack-merge');
const common = require('./webpack.common');
const path = require('path');

const config = {
    mode: 'development',
    output: {
        ...common.output,
        chunkFilename: 'dist/[name].chunk.js',
    },
    devtool: 'cheap-module-source-map',
    devServer: {
        host: 'localhost',
        port: 3000,
        compress: true,
        open: true,
        overlay: true,
        contentBase: path.join(__dirname, 'dist'),
        watchContentBase: true,
        hot: true,
        quiet: true,
        historyApiFallback: true,
        // proxy: {
        //     '/api/*': {
        //         target: 'http://localhost:8080',
        //         pathRewrite: {
        //             '^/api': '',
        //         },
        //     },
        // },
        inline: true,
        stats: 'errors-only',
    },
};

module.exports = merge(common, config);
