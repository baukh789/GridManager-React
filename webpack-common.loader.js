/**
 * @author  https://github.com/silence717
 * @date on 2017/12/12
 */
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = () => {
    return [
        {
            test: /\.js|jsx$/,
            exclude: /node_modules/,
            use: ['babel-loader']
        },
        {
            test: /\.css$/,
            use: [
                {
                    loader: MiniCssExtractPlugin.loader
                },
                {
                    loader: 'css-loader',
                    options: {
                        url: true, // 启用/禁用 url() 处理
                        sourceMap: true // 启用/禁用 Sourcemaps
                    }
                }
             ]
        }
    ]
};
