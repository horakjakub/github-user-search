const HtmlWebPackPlugin = require("html-webpack-plugin");
const WebpackMonitor = require('webpack-monitor');

module.exports = {
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: "babel-loader"
                    },
                    {
                        loader: "eslint-loader"
                    },
                ]
            },
            {
                test: /\.html$/,
                use: [
                    {
                        loader: "html-loader"
                    }
                ]
            },
            {
                test: /\.scss$/,
                use: [
                    "style-loader",
                    "css-loader",
                    "sass-loader"
                ]
            }
        ]
    },
    plugins: [
        new HtmlWebPackPlugin({
            template: "./src/index.html",
            filename: "./index.html"
        }),
        new WebpackMonitor({
            capture: true,
            target: './monitor/myStatsStore.json',
            launch: false,
            port: 3030,
        }),
    ],
    devtool: "source-map"
};