const del = require('del')
const exec = require('child_process').exec
const gulp = require('gulp')
const eslint = require('gulp-eslint')
const mocha = require('gulp-mocha')
const typedoc = require('gulp-typedoc')
const ts = require('gulp-typescript')
const tslint = require('gulp-tslint')

const dir = {
  build: 'dist',
  coverage: 'coverage',
  doc: 'doc',
  src: 'src',
  test: 'test'
}

const tsProject = ts.createProject('tsconfig.json')

gulp.task('eslint', () => {
  return gulp
    .src([
      '**/*.js',
      '!node_modules/**',
      `!${dir.build}/**`,
      `!${dir.coverage}/**`,
      `!${dir.doc}/**`
    ])
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError())
})

gulp.task('tslint', () => {
  return gulp
    .src(`${dir.src}/**.ts`)
    .pipe(tslint())
    .pipe(tslint.report())
})

gulp.task('check-links', (cb) => {
  exec('./node_modules/markdown-link-check/markdown-link-check README.md', (err, stdout, stderr) => {
    if (stderr != null && stderr !== '') {
      console.error(stderr)
    }
    cb(err)
  })
})

gulp.task('lint', ['eslint', 'tslint', 'check-links'])

gulp.task('build', () => {
  return tsProject
    .src()
    .pipe(tsProject())
    .pipe(gulp.dest(dir.build))
})

gulp.task('watch', ['build'], () => {
  return gulp.watch([`${dir.src}/**/*.ts`, `${dir.src}/**/*.js`], ['build'])
})

gulp.task('pre-test', ['build', 'lint'])

gulp.task('test', ['pre-test'], () => {
  return gulp
    .src([`${dir.test}/**/*.js`])
    .pipe(mocha())
})

gulp.task('doc', () => {
  return gulp
    .src(['src/**.ts'])
    .pipe(typedoc({
      // TypeScript options
      target: 'es6',
      includeDeclarations: true,
      excludeExternals: true,

      // Output options
      out: dir.doc,
      json: `${dir.doc}/output.json`,

      // TypeDoc options
      readme: 'README.md',
      version: true
    }))
})

gulp.task('clean', () => {
  return del([
    `${dir.coverage}/`,
    `${dir.build}/`,
    '**/*.log'
  ])
})

gulp.task('default', ['build'])
