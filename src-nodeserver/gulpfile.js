'use strict';

var gulp        = require('gulp'),
    typescript  = require('typescript'),
    ts          = require('gulp-typescript'),
    del         = require('del'),
    source      = require('vinyl-source-stream')

var project = ts.createProject('src/tsconfig.json', { typescript: typescript });

gulp.task('build', function() { 
    gulp.src('node_modules/**/*')
        .pipe(gulp.dest('../nodejs/node_modules'))

    var result = gulp.src('src/**/*ts')
        .pipe(project())
    return result.js.pipe(gulp.dest('../nodejs/js'))
})

gulp.task('clean', function(done) {
    del(['dist'], done.bind(this))
    del(['.tmp'], done.bind(this))
})