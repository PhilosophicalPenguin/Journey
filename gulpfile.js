var gulp = require('gulp');
var jshint = require('gulp-jshint');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var minifyCss = require('gulp-minify-css');
var clean = require('rimraf');

var targetClientSourceFiles = './client/**/*.js';
var distributeDirectory = './dist/';
var distributeSource = distributeDirectory + '**/*.js';

gulp.task('lint', function() {
    return gulp.src([targetClientSourceFiles, '!' + distributeSource, '!./client/bower_components/**/*'])
        .pipe(jshint())
        .pipe(jshint.reporter('jshint-stylish'))
        .pipe(jshint.reporter('fail'));
});

gulp.task('compressAndConcat', ['lint'], function() {
    return gulp.src(targetClientSourceFiles)
        .pipe(concat('all.js'))
        .pipe(gulp.dest(distributeDirectory))
        .pipe(rename('all.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest(distributeDirectory));
});

gulp.task('minify-css', function() {
    return gulp.src('styles/*.css')
        .pipe(minifyCss())
        .pipe(rename('style.min.css'))
        .pipe(gulp.dest(distributeDirectory));
});

gulp.task('clean', function() {
    return gulp.src(distributeDirectory, { read : false } )
        .pipe(clean());
});

gulp.task('watch', function() {
    gulp.watch(targetClientSourceFiles, ['lint', 'scripts']);
    gulp.watch('styles/*.css', ['minify-css']);
});

gulp.task('build', ['lint', 'compressAndConcat', 'minify-css']);