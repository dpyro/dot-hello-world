const gulp = require('gulp');
const clean = require('gulp-clean');
const eslint = require('gulp-eslint');
const ts = require('gulp-typescript');

gulp.task('lint', () => {
  return gulp
    .src(['**/*.js', '!node_modules/**'])
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});

gulp.task('test', ['lint'], () => {
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
