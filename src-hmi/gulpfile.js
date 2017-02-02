'use strict';

var gulp        = require('gulp'),
    typescript  = require('typescript'),
    ts          = require('gulp-typescript'),
    browserify  = require('browserify'),
    source      = require('vinyl-source-stream'),
    del         = require('del'),
    fs          = require('fs'),
    path        = require('path')

var project = ts.createProject('src/tsconfig.json', { typescript: typescript });

function getApp() {
  if(process.argv.length > 3) {
      return [process.argv[3].substring(2)]
  } else {
      return getFolders('src/apps')
  }
}
function getFolders(dir) {
  return fs.readdirSync(dir)
    .filter(function(file) {
      return fs.statSync(path.join(dir, file)).isDirectory();
    });
}

gulp.task('through-index', function () {
  var apps = getApp()

  return apps.map(function(app) {
    return gulp.src(['src/dist/index.html'])
      .pipe(gulp.dest('dist/' + app + '/') )
  })
});

gulp.task('through-all', function() {
  return gulp.src(['src/dist/general/**'])
    .pipe(gulp.dest('dist/') )
})

gulp.task('compile', function () {
  var result = gulp.src('src/**/*{ts,tsx}')
    .pipe(project())
  return result.js.pipe(gulp.dest('.tmp'))
});

gulp.task('build', ['through-index', 'through-all', 'compile'], function () {
  var apps = getApp()
  
  return apps.map(function(app) {
    var b = browserify('.tmp/apps/' + app + '/index.js')
    return b.bundle()
      .pipe(source('bundle.js'))
      .pipe(gulp.dest('dist/' + app))
  })
})

gulp.task('deploy', ['build'], function() {
  gulp.src('dist/**/*')
    .pipe(gulp.dest('../src/AppBundle/Resources/views'))

  gulp.src('dist/')

  return gulp.src('dist/**/*')
    .pipe(gulp.dest('../web/webassets'))
})

gulp.task('clean', function (done) {
    del(['.tmp'], done.bind(this))
    del(['dist'], done.bind(this))
});
