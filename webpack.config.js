/* eslint-env node */

const path = require('path'),
	webpack = require('webpack'),
	ExtractTextPlugin = require('extract-text-webpack-plugin'),

	cliArg = process.argv,
	prod = cliArg.indexOf('-p') > -1 || cliArg.indexOf('--production') > -1,

	mainStyleRegEx = /main\.styl$/,

	lazyStylusLoader = 'style-loader!css-loader!stylus-loader',
	lazyCSSLoader = 'style-loader!css-loader',
	bundleStylusLoader = ExtractTextPlugin.extract({
		fallback: 'style-loader',
		use: ['css-loader', 'stylus-loader']
	});

module.exports = {
	entry: {
		main: './components/main/main.js',
		styles: './components/main/main.styl',
		tests: './components/main/js/tests/tests.js',
	},

	output: {
		path: path.join(__dirname, 'public'),
		filename: 'js/[name].min.js',
	},

	node: {
		fs: 'empty'
	},
	module: {
		exprContextCritical: false,
		loaders: [
			{
				test: /\.js$/,
				loader: 'babel-loader',
				exclude: /node_modules/
			},

			{ //main.css required with javascript in dev and bundled (unobtrusive css) in prod
				test: mainStyleRegEx,
				loader: prod ? bundleStylusLoader : lazyStylusLoader
			},
			{ //all other css required with javascript and lazy loaded
				test: /\.styl$/,
				loader: lazyStylusLoader,
				exclude: mainStyleRegEx
			},

			{
				test: /\.css$/,
				loader: lazyCSSLoader,
				exclude: mainStyleRegEx
			},

			{
				test: /\.(png|woff|woff2|eot|ttf|svg)$/,
				loader: 'url-loader'
			},

			{
				test: /\.html$/,
				loader: 'html-loader'
			}
		]
	},
	plugins: [
		new ExtractTextPlugin('css/[name].min.css'),
		new webpack.NamedModulesPlugin(),
		new webpack.ProvidePlugin({
			$: 'jquery',
			jQuery: 'jquery',
			'window.jQuery': 'jquery',
			Popper: ['popper.js', 'default']
		})
	],
	devServer: {
		contentBase: __dirname + '/public/',
		watchContentBase: true,
		before(app) {
			app.get('*/css/styles.min.css', function(req, res) {
				res.set('Content-Type', 'text/css');
				res.send('//overwritten in dev mode to work with HMR\n//this same file is required via javascript in main.js');
			});
		}
	}
};
