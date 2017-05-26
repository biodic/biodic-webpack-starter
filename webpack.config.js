/*
아래의 설정은, production build(gulp build)용 기본 설정임
WebpackDevServer(gulp)를 위한 설정은 gulpfile.babel.js의 webpack:dev task에서 정의한 설정과 아래의 설정을 merge하여 서버를 구동.
*/
const
	webpack = require('webpack'),
	path = require('path'),
	ExtractTextPlugin = require('extract-text-webpack-plugin'),
	OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin'),
	HtmlWebpackPlugin = require('html-webpack-plugin');


const definePath = {
	src: path.join(__dirname, 'src/'),
	dist: path.join(__dirname, 'dist/')
}

module.exports = {
	entry: definePath.src + 'webpack.js',
	output: {
		path: definePath.dist,
		filename: 'js/bundle.js'
	},
	module: {
		rules: [
			{
				// js 파일을 ES5 호환형태로 변환
				test: /\.js$/,
				loader: 'babel-loader',
				exclude: /node_modules/,
				query: {
					cacheDirectory: true,
					presets: ['es2015']
				}
			},
			{
				// scss 컴파일 및 css파일 로더 (css를 bundle.js에 패키지하지 않기 위해 extract-text-webpack-plugin 사용)
				test: /\.s?css$/,
				loader: ExtractTextPlugin.extract({ fallback: "style-loader", use: "css-loader!sass-loader" })
			},          
			{
				// css에 명시된 폰트는 DIST/css/fonts/ 폴더에 저장
				test: /\.(ttf|eot|woff(2)?)(\?[a-z0-9]+)?$/,
				loader: 'file-loader',
				query: {
					emitFile: true,	// 폰트파일을 app.css에 패키징할 경우 false
					name: '[name].[ext]',
					publicPath: '../',
					outputPath: 'css/fonts/'
				}				
			},
			{
				// css에 명시된 이미지는 image-webpack-loader를 통해 minify시켜서 패키징
				test: /\.(jpe?g|png|gif|svg)$/i,
				loaders: ['url-loader','image-webpack-loader']
			}
		]
	},
	externals: {
		// CDN등을 이용하여 외부 라이브러리를 index.html에서 로드한 경우, bundle.js에 패키징하지 않는다.
		jquery: 'jQuery'
	},	
	plugins: [
		new webpack.ProvidePlugin({
			$: "jquery",
			jQuery: "jquery"
		}),
		
		// css는 bundle.js에 패키징하지 않고, 별도의 app.css파일로 분리
		new ExtractTextPlugin("css/app.css"),
		
		// webpack에서 빌드된 css를 minify
		new OptimizeCssAssetsPlugin(),

		// webpack에서 빌드된 js를 minify
		new webpack.optimize.UglifyJsPlugin({
			compress: {
				warnings: false,
				keep_fnames: true
			},
			mangle: {
				keep_fnames: true
			}			
		}),

		/*
		HtmlWebpackPlugin : 
		- bundle.js 및 app.css(webpack.js에서 정의) 링크를 자동으로 삽입				
		- index.html이 없다면 기본 템플릿을 통한 index.html생성
		- index.html이 있다면 기존 index.html에 bundle.js/app.css 링크만 추카 (index.html에 두 파일을 링크할 필요가 없음)
		*/
		new HtmlWebpackPlugin({
			template: definePath.src + '/index.html',
			minify: {collapseWhitespace: true}
		}),		
	]
}; 