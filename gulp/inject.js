'use strict';

var gulp = require('gulp');

var paths = gulp.paths;

var $ = require('gulp-load-plugins')();

var wiredep = require('wiredep').stream;

gulp.task('inject', ['styles', 'scripts'], function () {

  var injectStyles = gulp.src([
    paths.tmp + '/serve/{app,components}/**/*.css',
    '!' + paths.tmp + '/serve/app/vendor.css'
  ], { read: false });

  var injectScripts = gulp.src([
    '{' + paths.src + ',' + paths.tmp + '/serve}/{app,components}/**/*.js',
    './router/dist/router.es5.js',
    './router/node_modules/route-recognizer/dist/route-recognizer.js',
    '!' + paths.src + '/{app,components}/**/*.spec.js',
    '!' + paths.src + '/{app,components}/**/*.mock.js'
  ]).pipe($.angularFilesort());

  var injectOptions = {
    ignorePath: [paths.src, paths.tmp + '/serve'],
    addRootSlash: false
  };

  var wiredepOptions = {
    directory: 'bower_components',
    exclude: [/bootstrap\.css/, /foundation\.css/]
  };

  return gulp.src(paths.src + '/*.html')
    .pipe($.inject(injectStyles, injectOptions))
    .pipe($.inject(injectScripts, injectOptions))
    .pipe(wiredep(wiredepOptions))
    .pipe(gulp.dest(paths.tmp + '/serve'));

});
