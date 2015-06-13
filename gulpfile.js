var gulp        = require('gulp'),
    processhtml = require('gulp-processhtml'),
    jshint      = require('gulp-jshint'),
    uglify      = require('gulp-uglify'),
    concat      = require('gulp-concat'),
    rename      = require('gulp-rename'),
    minifyCss   = require('gulp-minify-css'),
    jasmine     = require('gulp-jasmine'),
    nodemon     = require('gulp-nodemon'),
    reporters   = require('jasmine-reporters');
    // server      = require('./index.js');
    
    // server = require('http').createServer(app);

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

gulp.task('server-test', ['lint'], function () {
    
    return gulp.src('spec/serverSpec.js')
      .pipe(jasmine({
          reporter: new reporters.TapReporter()
        }));
      // .on('end', function () {
      //   server.close();
      // });
});

gulp.task('compressAndConcat', ['lint', 'server-test'], function() {
  return gulp.src(dependencies.concat(jsSrcFiles))
    .pipe(concat('app.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest(distributeDirectory));
});

gulp.task('minify-main-css', function() {
  return gulp.src('client/styles/main.css')
    .pipe(minifyCss())
    .pipe(rename('style.min.css'))
    .pipe(gulp.dest(distributeDirectory));
});

gulp.task('minify-aboutus-css', function() {
  return gulp.src('client/styles/AboutUs.css')
    .pipe(minifyCss())
    .pipe(rename('aboutus.min.css'))
    .pipe(gulp.dest(distributeDirectory));
});


gulp.task('copy-assets', function() {
  return gulp.src('client/assets/*')
    .pipe(gulp.dest('./dist/assets'));
});

gulp.task('process-index', function () {
  return gulp.src('client/index.html')
   .pipe(processhtml())
   .pipe(gulp.dest('./dist'));
});

gulp.task('process-aboutus', function () {
  return gulp.src('client/about.html')
   .pipe(processhtml())
   .pipe(gulp.dest('./dist'));
});

gulp.task('start-nodemon', ['lint', 'server-test'], function () {
  nodemon({
    script: 'index.js',
    ext: 'js'
  })
})

gulp.task('watch', function() {
  gulp.watch([jsSrcFiles, './client/index.html', './client/styles/main.css'], ['build']);
});

// gulp.task('test', ['start-nodemon']);

gulp.task('deploy', ['compressAndConcat', 'minify-main-css', 'minify-aboutus-css', 'copy-assets', 'process-index', 'process-aboutus']);


