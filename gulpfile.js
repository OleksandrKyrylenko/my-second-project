const 	gulp = require('gulp'),
		concat = require('gulp-concat'),
		//imagemin = require('gulp-imagemin'),
		uglify = require('gulp-uglify-es').default,
		server = require('browser-sync').create();	

const pug2html = function() {
	return gulp.src('app/**/*.html')
	.pipe(gulp.dest('./dist/'));
};

const styles = function() {
	return gulp.src('app/css/*.css')
	.pipe(gulp.dest('dist/css'));
};

const scripts = function() {
	return gulp.src('app/js/*.js')
	.pipe(concat('script.js'))
	.pipe(uglify(''))
	.pipe(gulp.dest('dist/js'));
};

const compress = function() {
    return gulp.src('app/img/**')
    .pipe(gulp.dest('dist/img/'))
};

const serverFunc = function() {
	server.init({
		server: "dist",
		notify: false,
		files: ['./dist/**/*.html','./dist/js/*.js','./dist/css/*.css']
	})
	
	gulp.watch('app/css/*.css', gulp.series(styles)).on('change', server.reload);
	gulp.watch('app/js/*.js', gulp.series(scripts)).on('change', server.reload);	
	gulp.watch('app/**/*.html', gulp.series(pug2html)).on('change', server.reload);
	gulp.watch('build/*.html').on('change', server.reload);
};

const dev = gulp.parallel( pug2html, styles, scripts, compress)

const build = gulp.series(dev)

module.exports.default = gulp.series(build, serverFunc)