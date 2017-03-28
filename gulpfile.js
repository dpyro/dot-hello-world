const gulp = require('gulp');
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

gulp.task('default', () => {
  return gulp.src('src/**/*.ts')
    .pipe(ts({
      out: 'index.js'
    }))
    .pipe(gulp.dest('dist/'));
});
