var browser = require('browser-sync');
var del = require('del');
var gulp = require('gulp');
var eslint = require('gulp-eslint');
var listGulpTasks = require('gulp-task-listing');
var sync = require('run-sequence');
var todo = require('gulp-todoist');
var webpack = require('webpack-stream');


 
var gutil = require('gulp-util');
var bower = require('bower');
var concat = require('gulp-concat');
 


var paths = {
  sass: ['./scss/**/*.scss']
};


 

gulp.task('sass', function(done) {
  gulp.src('./scss/ionic.app.scss')
    .pipe(sass())
    .on('error', sass.logError)
    .pipe(gulp.dest('./www/css/'))
    .pipe(minifyCss({
      keepSpecialComments: 0
    }))
    .pipe(rename({ extname: '.min.css' }))
    .pipe(gulp.dest('./www/css/'))
    .on('end', done);
});

gulp.task('clean', function() {
  return del(['dist/**/*.*', 'dist/img', 'generated']);
});

gulp.task('copy', function() {
  return gulp.src(paths.toCopy, { base: 'www' })
    .pipe(gulp.dest(paths.dest));
});

gulp.task('lint', function() {
  return gulp.src('www/**/*.js')
    .pipe(eslint({'useEslintrc': true}))
    .pipe(eslint.formatEach('stylish', process.stderr))
    .pipe( eslint.failAfterError() );
});

gulp.task('ls', listGulpTasks);

gulp.task('serve', function() {
  browser({
    port: process.env.PORT || 4500,
    open: false,
    ghostMode: false,
    server: {
      baseDir: 'dist'
    }
  });
});

gulp.task('todo', function() {
  return gulp.src(paths.js)
    .pipe(todo({silent: false, verbose: true}));
});

gulp.task('watch', function() {
  gulp.watch(paths.app, ['build', browser.reload]);
  gulp.watch(paths.toCopy, ['copy', browser.reload]);
     gulp.watch(paths.sass, ['sass']);
});



//______________________________________________________________________________

gulp.task('default', function(done) {
  sync('dist', 'serve', 'watch', 'sass', done);
});

gulp.task('dist', function(done) {
  sync('clean', 'build', 'copy', done);
});


gulp.task('git-check', function(done) {
  if (!sh.which('git')) {
    console.log(
      '  ' + gutil.colors.red('Git is not installed.'),
      '\n  Git, the version control system, is required to download Ionic.',
      '\n  Download git here:', gutil.colors.cyan('http://git-scm.com/downloads') + '.',
      '\n  Once git is installed, run \'' + gutil.colors.cyan('gulp install') + '\' again.'
    );
    process.exit(1);
  }
  done();
});
