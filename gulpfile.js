var gulp = require('gulp');
var jshint = require('gulp-jshint');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var minifyCss = require('gulp-minify-css');

var targetClientSourceFiles = './client/**/*.js';
var ignoreBower = '!./client/bower_components/**/*';
var ignoreAngular = '!./client/angular/**/*';

var jsSrcFiles = [
    './client/models/PositionModel.js',
    './client/collections/PositionsCollection.js',
    './client/models/DiscoverPathsModel.js',
    './client/models/AppModel.js',
    './client/views/DiscoverPathsView.js',
    './client/views/PositionsCollectionView.js',
    './client/views/PositionView.js',
    './client/views/AppView.js',
    './client/views/StatsTableView.js',
    './client/views/JourneyView.js',
    './client/clientRouter.js', 
    ignoreBower,
    ignoreAngular
    ]

var distributeDirectory = './dist/';
var distributeSource = distributeDirectory + '**/*.js';

// var clientTargetsAndIgnores = [jsSrcFiles, ignoreBower, ignoreAngular];

gulp.task('lint', function() {
    return gulp.src(jsSrcFiles)
        .pipe(jshint())
        .pipe(jshint.reporter('jshint-stylish'))
        .pipe(jshint.reporter('fail'));
});

gulp.task('compressAndConcat', ['lint'], function() {
    return gulp.src(jsSrcFiles)
        .pipe(concat('all.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest(distributeDirectory));
});

gulp.task('minify-css', function() {
    return gulp.src('client/styles/*.css')
        .pipe(minifyCss())
        .pipe(rename('style.min.css'))
        .pipe(gulp.dest(distributeDirectory));
});

gulp.task('copy', function() {
    return gulp.src('client/index.html')
    .pipe(gulp.dest(distributeDirectory));
});

gulp.task('copy-assets', function() {
    return gulp.src('client/assets/*')
    .pipe(gulp.dest('./dist/assets'));
})

// gulp.task('clean', function() {
//     clean([distributeDirectory]);
// });

gulp.task('watch', function() {
    gulp.watch(targetClientSourceFiles, ['lint', 'build']);
    gulp.watch('styles/*.css', ['minify-css']);
});

gulp.task('build', ['compressAndConcat', 'minify-css', 'copy', 'copy-assets']);
