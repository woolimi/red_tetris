const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = (env) => {
	const envKeys = Object.keys(env).reduce((prev, next) => {
		prev[`process.env.${next}`] = JSON.stringify(env[next]);
		return prev;
	}, {});

	return {
		name: "red-tetris",
		mode: "development",
		devtool: "eval-cheap-source-map",
		resolve: {
			extensions: ["*", ".js", ".jsx"],
		},
		entry: `${env.INPUT_DIR}/index.js`,
		module: {
			rules: [
				{
					test: /\.(js|jsx)$/,
					exclude: /node_modules/,
					use: ["babel-loader"],
				},
				{
					test: /\.css$/,
					use: ["style-loader", "css-loader"],
				},
				{
					test: /\.(png|woff|woff2|eot|ttf|svg)$/,
					loader: "url-loader",
					options: {
						limit: 100000,
					},
				},
				{
					test: /\.(mp3|wav)$/,
					use: [
						{
							loader: "file-loader",
						},
					],
				},
			],
		},
		output: {
			path: env.OUTPUT_DIR,
			filename: "bundle.js",
		},
		plugins: [
			new CleanWebpackPlugin(),
			new HtmlWebpackPlugin({
				template: `${env.PUBLIC_DIR}/index.dev.html`,
				favicon: `${env.PUBLIC_DIR}/favicon.ico`,
			}),
			new webpack.DefinePlugin(envKeys),
		],
	};
};
