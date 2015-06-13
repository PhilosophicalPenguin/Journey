var gulp        = require('gulp'),
    processhtml = require('gulp-processhtml'),
    jshint      = require('gulp-jshint'),
    uglify      = require('gulp-uglify'),
    concat      = require('gulp-concat'),
    rename      = require('gulp-rename'),
    minifyCss   = require('gulp-minify-css');

var targetClientSourceFiles = './client/**/*.js',
    ignoreBower             = '!./client/bower_components/**/*',
    ignoreAngular           = '!./client/angular/**/*',
    distributeDirectory     = './dist/',
    distributeSource        = distributeDirectory + '**/*.js',
    ignoreBower             = '!./client/bower_components/**/*',
    ignoreAngular           = '!./client/angular/**/*';

var dependencies = [
  './client/bower_components/jquery/dist/jquery.js',
  './client/bower_components/jquery-ui/jquery-ui.js',
  './client/bower_components/underscore/underscore.js',
  './client/bower_components/backbone/backbone.js',
  './client/bower_components/highcharts-release/highcharts.js',
  './client/bower_components/highcharts-release/highcharts-3d.js',
  './client/bower_components/highcharts-release/highcharts-more.js',
  './client/bower_components/d3/d3.js'
]

var jsSrcFiles = [
  './client/models/AppModel.js',
  './client/models/AboutUsModel.js',
  './client/models/PositionModel.js',
  './client/models/ProfileModel.js',
  './client/models/FilterModel.js',
  './client/models/ThumbnailModel.js',
  './client/models/SimilarPeopleModel.js',
  './client/models/NavigationModel.js',
  './client/models/TimelineItemModel.js',
  './client/collections/TimelineItemsCollection.js',
  './client/models/TimelineModel.js',
  './client/collections/AboutUsCollection.js',
  './client/collections/ThumbnailsCollection.js',
  './client/collections/PositionsCollection.js',
  './client/collections/FiltersCollection.js',
  './client/views/AppView.js',
  './client/views/DiscoverPathsView.js',
  './client/views/AboutUsTemplateBootstrap.js',
  './client/views/AutocompleteView.js',
  './client/views/NavBarView.js',
  './client/views/NavigationView.js',
  './client/views/JourneyView.js',
  './client/views/ThumbnailView.js',
  './client/views/ThumbnailsCollectionView.js',
  './client/views/PositionView.js',
  './client/views/PositionsCollectionView.js',
  './client/views/PositionsStatsChartView.js',
  './client/views/ExperienceView.js',
  './client/views/EducationChartView.js',
  './client/views/EducationView.js',
  './client/views/SkillsStatsChartView.js',
  './client/views/SkillsView.js',
  './client/views/FilterView.js',
  './client/views/FiltersCollectionView.js',
  './client/views/TimeBlockView.js',
  './client/views/TimelineView.js',
  './client/views/SimilarPositionsView.js',
  './client/views/ProfileCardView.js',
  './client/views/ProfileView.js',
  './client/clientRouter.js'
]

var clientTargetsAndIgnores = [jsSrcFiles, ignoreBower, ignoreAngular];

gulp.task('lint', function() {
  return gulp.src(jsSrcFiles)
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'))
    .pipe(jshint.reporter('fail'));
});

gulp.task('compressAndConcat', ['lint'], function() {
  return gulp.src(dependencies.concat(jsSrcFiles))
    .pipe(concat('app.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest(distributeDirectory));
});

gulp.task('minify-css', function() {
  return gulp.src('client/styles/*.css')
    .pipe(minifyCss())
    .pipe(rename('style.min.css'))
    .pipe(gulp.dest(distributeDirectory));
});

// gulp.task('copy', function() {
//   return gulp.src('client/index.html')
//     .pipe(gulp.dest(distributeDirectory));
// });

gulp.task('copy-assets', function() {
  return gulp.src('client/assets/*')
    .pipe(gulp.dest('./dist/assets'));
});

gulp.task('process', function () {
  return gulp.src('client/index.html')
   .pipe(processhtml())
   .pipe(gulp.dest('./dist'));
});

gulp.task('watch', function() {
  gulp.watch([jsSrcFiles, './client/index.html', './client/styles/main.css'], ['lint', 'build']);
});

gulp.task('build', ['compressAndConcat', 'minify-css', 'copy-assets', 'process']);
