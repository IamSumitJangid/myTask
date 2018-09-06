var gulp = require('gulp');
var del = require('del');
var less = require('gulp-less');
var rename = require("gulp-rename");
var cleanCSS = require('gulp-clean-css');
var gulpWebpack = require('gulp-webpack');
var webpack = require('webpack');
var htmlmin = require('gulp-htmlmin');
var notify = require("gulp-notify");
var CacheBuster = require('gulp-cachebust');
var watch = require('watch')
var browserSync = require('browser-sync').create();
var runSequence = require('run-sequence');
var embedTemplates = require('gulp-angular-embed-templates');
var cachebust = new CacheBuster();


gulp.task('script', function() {
    return gulp.src([
            './src/app.js',
            './src/http-interceptor.js',
            './src/modules/home/home_module.js',
            './src/modules/**/*.js'
        ])
        .pipe(gulpWebpack({
            output: {
                filename: 'app.min.js',
            }//,
            // plugins: [new webpack.optimize.UglifyJsPlugin()],
        }, webpack))
        .pipe(embedTemplates())
        .pipe(cachebust.resources())
        .pipe(gulp.dest('./build/js/'))
        .pipe(browserSync.stream())
});

gulp.task('clean', function() {
    del(['./build/js/']);
});


gulp.task('build-html', ['clean', 'script'], function(done) {
    return gulp.src('./index.html')
        // .pipe(htmlmin({collapseWhitespace: true}))
        .pipe(cachebust.references())
        .pipe(gulp.dest('./build/'))
        .pipe(notify('All tasks finished.'))
        .pipe(browserSync.stream());
    done();
});

gulp.task('build', function(callback) {
    runSequence('build-html');
});

gulp.task('watch', function() {
    browserSync.init({
        server: {
            baseDir: "./build"
        }
    });
    gulp.watch("./src/**/**/**/**/*.*", function() {
        gulp.start('build-html');
    });
    gulp.task('build', function(callback) {
        runSequence('build-html');
    });
    gulp.watch("*.*").on('change', browserSync.reload);
});