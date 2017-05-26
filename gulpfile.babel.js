/*
	$ gulp          => webpack-dev-derver 실행 (Browser Sync)
	$ gulp build    => production build
*/
'use strict';

import gulp from 'gulp';
import gutil from 'gulp-util';
import babel from 'gulp-babel'; // ES6 → ES5

import cleanCSS from 'gulp-clean-css';
import htmlmin from 'gulp-htmlmin';
import imagemin from 'gulp-imagemin';

import clear from 'cli-clear';  // for clear the terminal screen
import del from 'del';

import webpack from 'webpack';
import merge from 'webpack-merge';
import WebpackDevServer from 'webpack-dev-server';
import BrowserSyncPlugin from 'browser-sync-webpack-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';

import webpackConfig from './webpack.config.js';

clear();    // Clear screen

// Path Info ////////////////////////////////////////////////////////////////
	const DIR = {
		SRC: 'src',
		DEST: 'dist'
	};

	const SRC = {
		JS: DIR.SRC + '/js/*.js',
		CSS: DIR.SRC + '/css/*.css',
		SCSS: DIR.SRC + '/scss/*.scss',
		HTML: DIR.SRC + '/**/*.html',
		IMAGES: DIR.SRC + '/images/*'
	};

	const DEST = {
		JS: DIR.DEST + '/js',
		CSS: DIR.DEST + '/css',
		HTML: DIR.DEST + '/',
		IMAGES: DIR.DEST + '/images'
	};


// Tasks ////////////////////////////////////////////////////////////////
	gulp.task('default', ['webpack:dev'], () => {
		return gutil.log(gutil.colors.yellow('Gulp is running'));
	});
	gulp.task('build', ['clean','images','webpack:build'], () =>{
		return gutil.log(gutil.colors.yellow('Webpack building...'));
	});


	// Clean DIST
	gulp.task('clean', () => {
		return del.sync([DIR.DEST+'/**/*']);
	});

	gulp.task('images', () => {
		return gulp.src(SRC.IMAGES)
			.pipe(imagemin())
			.pipe(gulp.dest(DEST.IMAGES));
	});


	// -------------------------------------------------------------------
	// Production build
	gulp.task('webpack:build', () => {
		webpack(webpackConfig, function(err, stats) {
			if(err) throw new gutil.PluginError("webpack", err);
			gutil.log(stats.toString({colors: true}));
			return gutil.log(gutil.colors.yellow('build completed'));
		})
	});

	// WebpackDevServer
	gulp.task('webpack:dev', () => {
		let config = merge(webpackConfig, {
			plugins: [
				// 클라이언트 사이드 코드 변경 시 브라우저 자동으로 새로고침
				new BrowserSyncPlugin({
					host: 'localhost',
					port: 7000, // 이 프트로 접속시 BrowserSync동작
					proxy: 'http://localhost:3000/' // WebpackDevServer
				}),

				// Webpack에서 패키징 하지않고, Static 파일을 그대로 사용할 경우 해당 파일 또는 폴더를 복사(WebpackDevServer 동작시에만 작동)
				new CopyWebpackPlugin([
					{ from: 'src/images/', to: 'images/' }
				])                  
			]
		});

		// Dev 서버 실행
		new WebpackDevServer(webpack(config), {
			hot: true,  // Enable HMR(Hot Module Replacement)
			stats: { colors: true }
		})
		.listen(3000, 'localhost', (err, result) => {
			if (err) {
				gutil.log(gutil.colors.red(err));
			}
			else {
				gutil.log(gutil.colors.yellow('WebpackDevServer is running'));
			}
		});
	});