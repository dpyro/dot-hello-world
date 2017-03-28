const gulp = require('gulp');
const clean = require('gulp-clean');
const eslint = require('gulp-eslint');
const mocha = require('gulp-mocha');
const ts = require('gulp-typescript');

gulp.task('lint', () => {
  return gulp
    .src(['**/*.js', '!node_modules/**'])
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});

gulp.task('mocha', () => {
  return gulp
    .src('test/**.js', { read: false } )
    .pipe(mocha());
});

gulp.task('test', ['lint', 'mocha'], () => {
  // This will only run if the lint task is successful...
});

gulp.task('clean', () => {
  return gulp
    .src('dist/', { read: false })
    .pipe(clean());
});

gulp.task('default', () => {
  const tsProject = ts.createProject('tsconfig.json');

  return tsProject
    .src()
    .pipe(tsProject())
    .pipe(gulp.dest('dist/'));
});
