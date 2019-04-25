const path = require("path");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const FaviconsWebpackPlugin = require("favicons-webpack-plugin");

module.exports = {
    entry: './src/index.js',
    plugins: [
        new FaviconsWebpackPlugin({
            logo: './src/assets/images/favicon.png',
            prefix: 'icons-[hash]/',
            persistentCache: true,
            inject: true,
            background: '#fff',
            icons: {
                favicons: true,
                firefox: true,
            }
        }),
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: './src/index.html',
            filename: 'index.html'
        })
    ],
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'build')
    },
    module: {
        rules: [
            {
                test: /\.(html)$/,
                use: {
                    loader: 'html-loader',
                    options: {
                        attrs: ['a:href', 'img:src', 'object:data', 'iframe:src']
                    }
                }
            },
            {
                test: /\.(pdf|png|gif|svg|jpg|jpeg|ico)$/,
                use: [
                    'file-loader'
                ]
            },
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                options: {
                    presets: ['@babel/preset-env']
                }
            }
        ]
    }
};