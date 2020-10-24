const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const ErrorOverlayPlugin = require('error-overlay-webpack-plugin');

const outputDirectory = 'dist';

module.exports = {
	name: 'red-tetris',
	mode: 'development', // production
	devtool: 'cheap-module-source-map',
	resolve: {
		extensions: ['*', '.js', '.jsx']
	},
	entry: './src/client/index.js',
	module: {
		rules: [{
			test: /\.(js|jsx)$/,
			exclude: /node_modules/,
			use: ['babel-loader']
		},
		{
			test: /\.css$/,
			use: ['style-loader', 'css-loader']
		},
		{
			test: /\.(png|woff|woff2|eot|ttf|svg)$/,
			loader: 'url-loader',
			options: {
				limit: 100000,
			},
		}
		]
	},
	output: {
		path: path.join(__dirname, outputDirectory),
		filename: 'bundle.js'
	},
	plugins: [
		new CleanWebpackPlugin(),
		new HtmlWebpackPlugin({
			template: './public/index.html'
			// favicon: './public/favicon.ico'
		}),
		new ErrorOverlayPlugin(),
	],
};

