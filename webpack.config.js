const path=require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
// 该插件应该是在production模式下使用且不使用style-loader
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const devMode = process.env.NODE_ENV !== 'production';
console.log('devMode:',process.env.NODE_ENV)
module.exports={
    // 模式：production|develop|none
    mode:'production',
    // 
    devtool:'eval',
    // 入口： 字符形式的属于单入口单出口，数组形式的属于多入口单出口，对象形式的属于多入口多出口
    entry:'./src/app/main.js',
    // 出口：必须是绝对路径
    output:{
        // 打包之后生成的文件夹的路径和文件夹的名称
        path:path.resolve(__dirname,'dist'),
        // 打包之后生成的文件名 name为占位符 https://www.webpackjs.com/configuration/output/#output-filename
        filename:'[name].js'
    },
    // loader
    module:{
        rules:[
            {
                test:/\.txt$/,
                use:'raw-loader'
            },
            // 处理样式 ,一个规则由多个loader时采用数组的形式，解析顺序事从后往前
            {
                test:/\.css$/,
                use:[ 
                    // 'style-loader',
                    {
                        loader:devMode?'style-loader':MiniCssExtractPlugin.loader
                    }, 
                'css-loader' ]
            },
            // 把加载的多文件模块进行移动处理，并返回移动后的URL
            // {
            //     test:/\.(png|jpg|jpeg|gif)$/,
            //     loader:'file-loader',
            //     options:{
            //         name:'[name].[ext]',
            //         // 打包后的文件的url
            //         // publicPath:'./dist/img',
            //         publicPath:'./img',
            //         // 打包后存放的位置，真实存放的物理路径
            //         outputPath:'./img'
            //     }   
            // },
            {
                test:/\.(png|jpe?g|gif)$/i,
                loader:'url-loader',
                options:{
                    name:'[name].[ext]',
                    // 打包后的文件的url
                    // publicPath:'./dist/img',
                    publicPath:'./img',
                    // 打包后存放的位置，真实存放的物理路径
                    outputPath:'./img',
                    // 低于指定的限制时返回base64文本
                    limit:8192
                }
            }
        ]
    },
    // 插件
    plugins:[
        // 简单创建 HTML 文件，用于服务器访问
        new HtmlWebpackPlugin({
            title:'app',
            filename:'index.html',
            template:path.join(__dirname, 'index.html'),
            inject:true,
            meta:{
                viewport: "width=device-width, initial-scale=1, shrink-to-fit=no"
            }
        }),
        // 清除打包目录
        new CleanWebpackPlugin(),
        // 将CSS提取为独立的文件
        new MiniCssExtractPlugin({
            // 类似 webpackOptions.output里面的配置 可以忽略
            filename: '[name].css',
            chunkFilename: '[id].css'
        }),
    ]
}