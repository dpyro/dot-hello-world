const del = require('del');
const gulp = require('gulp');
const eslint = require('gulp-eslint');
const mocha = require('gulp-mocha');
const ts = require('gulp-typescript');

const tsProject = ts.createProject('tsconfig.json');

gulp.task('lint', () => {
  return gulp
    .src(['**/*.js', '!node_modules/**'])
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});

gulp.task('build', () => {
  return tsProject
    .src()
    .pipe(tsProject())
    .pipe(gulp.dest('dist/'));
});

gulp.task('watch', ['build'], () => {
  return gulp.watch('src/**/*.ts', ['build']);
});

gulp.task('mocha', () => {
  return gulp
    .src('test/**.js', { read: false } )
    .pipe(mocha());
});

gulp.task('test', ['lint', 'default'], () => {
  return gulp.task('test-after-build', ['mocha']);
});

gulp.task('clean', () => {
  return del([
    'dist/',
    '**/*.log'
  ]);
});

gulp.task('default', ['build']);
