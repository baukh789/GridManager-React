const path = require('path');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const getRules = require('./webpack-common.loader');
const buildPath = path.join(__dirname, './dist');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const CleanPlugin = require('clean-webpack-plugin');

const { version } = require('./package.json');

const srcDir = path.join(__dirname, './src');
const config = {
    mode: 'production',

	// 入口文件所在的上下文
    context: srcDir,

	// 入口文件配置
	entry: {
        js: './js/index.js'
	},

	// 配置模块如何解析
	resolve:{
		extensions: [".js"] //当requrie的模块找不到时,添加这些后缀
	},

	// 文件导出的配置
	output:{
		path: buildPath ,
		filename: "js/gm-react.js",
        libraryTarget: 'umd'
	},

    externals: ['react', 'react-dom'],

    // 优化代码
    optimization: {
        minimizer: [
            // 压缩js
            new UglifyJsPlugin({
                uglifyOptions: {
                    cache: true,
                    parallel: true,
                    sourceMap: true,
                    warnings: false
                }
            }),

            // 压缩css
            new OptimizeCssAssetsPlugin({
                assetNameRegExp: /\.css$/g,
                cssProcessor: require('cssnano'),
                cssProcessorOptions: {
                    discardComments: {removeAll: true},
                    minifyGradients: true
                },
                canPrint: true
            })
        ]
    },

    // 以插件形式定制webpack构建过程
    plugins: [
        new CleanPlugin([buildPath]),
        // 将样式文件 抽取至独立文件内
        new MiniCssExtractPlugin({
            filename: 'css/gm-react.css',
            chunkFilename: '[id].css'
        }),

        // 将文件复制到构建目录
        // CopyWebpackPlugin-> https://github.com/webpack-contrib/copy-webpack-plugin
        new CopyWebpackPlugin([
            {from: path.join(__dirname, '/package.json'), to: '', toType: 'file'},
            {from: path.join(__dirname, '/README.md'), to: '', toType: 'file'}
        ]),

        // 配置环境变量
        new webpack.DefinePlugin({
            'process.env': {
                VERSION: JSON.stringify(version)
            }
        })
    ],


    // 处理项目中的不同类型的模块。
	module: {
		rules: getRules()
	}
};

module.exports = config;
