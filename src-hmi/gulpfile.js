'use strict';

var gulp        = require('gulp'),
    typescript  = require('typescript'),
    ts          = require('gulp-typescript'),
    browserify  = require('browserify'),
    source      = require('vinyl-source-stream'),
    del         = require('del')

var project = ts.createProject('src/tsconfig.json', { typescript: typescript });

var defaultApp = "todo"

function getApp() {
  if(process.argv.length > 3) {
    return process.argv[3].substring(2)
  } else {
    return defaultApp
  }
}

gulp.task('through', function () {
  var app = getApp()

	return gulp
    .src(['src/views/index.html'])
    .pipe(gulp.dest('dist/' + app + '/') );
});

gulp.task('compile', function () {
  var result = gulp.src('src/**/*{ts,tsx}')
    .pipe(project());
  return result.js.pipe(gulp.dest('.tmp'));
});

gulp.task('bundle', ['through','compile'], function () {
  var app = getApp()

  var b = browserify('.tmp/apps/' + app + '/index.js');
  return b.bundle()
    .pipe(source('bundle.js'))
    .pipe(gulp.dest('dist/' + app))
  ;
});

gulp.task('clean', function (done) {
  del(['.tmp'], done.bind(this));
});
