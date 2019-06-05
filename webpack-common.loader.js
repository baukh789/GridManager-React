/**
 * @author  https://github.com/silence717
 * @date on 2017/12/12
 */
const path = require('path');
const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin');

module.exports = (srcCodeDir, idDev) => {
    return [
        {
            test: /\.jsx?$/,
            exclude: /(node_modules|bower_components)/,
            include: [path.join(__dirname, srcCodeDir)],
            use: [{
                loader: 'babel'
            }]
        },
        {
            test: /\.js?$/,
            exclude: /(node_modules|bower_components)/,
            include: [path.join(__dirname, srcCodeDir)],
            use: [{
                loader: 'babel'
            }]
        },
        {
            test: /\.css$/,
            use: ExtractTextWebpackPlugin.extract({
                use: [{
                    loader: 'css-loader',
                }]
            })
        }
    ]
};
