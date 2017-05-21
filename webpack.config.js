var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var path = require('path');

module.exports = {
    devtool: 'cheap-module-eval-source-map',
    entry: [
        //'webpack-hot-middleware/client',
        'babel-polyfill',
        './src/index.js'
    ],
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'app.bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: ['react-hot-loader', 'babel-loader'],
                include: [
                    path.resolve(__dirname, "src"),
                ],
                exclude: [/node_modules/],
            },
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract(
                    {
                        fallback: "style-loader",
                        use: ['css-loader','sass-loader']
                    }
                )
            },
            {
                test:   /\.css$/,
                loader: "style-loader!css-loader"
            }
        ]
    },
    plugins: [
        // new webpack.optimize.OccurrenceOrderPlugin(),
        // new webpack.HotModuleReplacementPlugin(),
        // new webpack.NoErrorsPlugin(),
        new HtmlWebpackPlugin({
            title: '***Lunch',
            template: './index.html',
            hash: true,
            minify: {
                collapseWhitespace: true
            }
        }),
        new ExtractTextPlugin({
            filename: 'app.css',
            allChunks: true
        })
    ],
};
