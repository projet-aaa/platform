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

function getFolders(dir) {
  return fs.readdirSync(dir)
    .filter(function(file) {
      return fs.statSync(path.join(dir, file)).isDirectory();
    });
}
function getAllFiles_aux(dir) {
  var files = fs.readdirSync(dir),
      len = files.length,
      res = []

    // console.log(files)
    for(var i = 0; i < len; i++) {
      var p = path.join(dir, files[i])
      
      if(p != null) {
        if(fs.statSync(p).isDirectory()) {
          res.push.apply(res, getAllFiles_aux(p))
        } else {
          res.push(p)
        }
      }
    }

    return res
}
function getAllFiles(dir) {
  var files = getAllFiles_aux(dir)
  return files.map((file) => { 
    var s = file.split(path.sep)
    s = s.slice(2)
    return s.join(path.sep)
  })
}

function getApps() {
  if(process.argv.length > 3) {
      return [process.argv[3].substring(2) + '.tsx']
  } else {
      return getAllFiles('src/apps')
  }
}

gulp.task('through-index', function () {
  var apps = getApps()

  return apps.map(function(app) {
    var name = path.basename(app, '.tsx')
    return gulp.src(['src/dist/index.html'])
      .pipe(gulp.dest('dist/' + name + '/') )
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
  var apps = getApps()
  
  return apps.map(function(app) {
    var name = path.basename(app, '.tsx')
    var b = browserify('.tmp/apps/' + app.split('.')[0] + '.js')
    return b.bundle()
      .pipe(source('bundle.js'))
      .pipe(gulp.dest('dist/' + name))
  })
})

gulp.task('deploy', ['build'], function() {
  return gulp.src('dist/**/*')
    .pipe(gulp.dest('../web/webassets'))
})

gulp.task('clean', function (done) {
    del(['.tmp'], done.bind(this))
    del(['dist'], done.bind(this))
});
