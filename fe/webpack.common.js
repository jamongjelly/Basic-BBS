const HtmlWebpackPlugin = require('html-webpack-plugin');
const TsConfigPathsWebpackPlugin = require('tsconfig-paths-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const path = require('path');
const srcDir = path.resolve(__dirname, 'src');
const templateDir = path.resolve(__dirname, 'src', 'index.html');

const isProduction = (process.env.NODE_ENV = 'PRODUCTION');

module.exports = {
    entry: './src/index.tsx',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].[chunkhash].js',
        publicPath: '/',
    },
    context: __dirname,
    target: 'web',

    resolve: {
        modules: ['node_modules', srcDir],
        extensions: ['.ts', '.tsx', '.js'],
        alias: {
            src: srcDir,
        },
        plugins: [new TsConfigPathsWebpackPlugin()],
    },

    module: {
        rules: [
            {
                test: /\.tsx?$/,
                include: [srcDir],
                exclude: /node_modules/,
                use: [{ loader: 'ts-loader' }],
            },
            {
                test: /\.(jpe?g|gif|png|svg)$/i,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name() {
                                if (isProduction) {
                                    return '[contenthash].[ext]';
                                }
                                return '[path][name].[ext]';
                            },
                            publicPath: '/assets/',
                            outputPath: 'assets/',
                        },
                    },
                ],
            },
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader'],
            },
        ],
    },

    plugins: [
        new HtmlWebpackPlugin({
            template: templateDir,
            minify: isProduction
                ? {
                      removeComments: true,
                      collapseWhitespace: true,
                      removeRedundantAttributes: true,
                      useShortDoctype: true,
                      removeEmptyAttributes: true,
                      removeStyleLinkTypeAttributes: true,
                      removeScriptTypeAttributes: true,
                      keepClosingSlash: true,
                      minifyJS: true,
                      minifyCSS: true,
                      minifyURLs: true,
                  }
                : undefined,
        }),
        new CleanWebpackPlugin({
            cleanStaleWebpackAssets: false,
        }),
    ],
};
