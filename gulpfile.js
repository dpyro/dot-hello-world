const del = require('del')
const exec = require('child_process').exec
const gulp = require('gulp')
const eslint = require('gulp-eslint')
const imagemin = require('gulp-imagemin')
const mocha = require('gulp-mocha')
const sourcemaps = require('gulp-sourcemaps')
const typedoc = require('gulp-typedoc')
const typescript = require('gulp-typescript')
const tslint = require('gulp-tslint')

const dir = {
  build: 'dist',
  coverage: 'coverage',
  doc: 'doc',
  images: 'images',
  src: 'src',
  test: 'test'
}

const tsProject = typescript.createProject('tsconfig.json')

gulp.task('eslint', () => {
  return gulp
    .src([
      '**.js',
      '**.json',
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

gulp.task('lint', ['eslint', 'tslint'])

gulp.task('build', ['image'], () => {
  return tsProject
    .src()
    .pipe(sourcemaps.init())
    .pipe(tsProject())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(dir.build))
})

gulp.task('watch', () => {
  gulp.watch('*.js', ['eslint'])
  gulp.watch(`${dir.src}/**.ts`, ['build'])
  gulp.watch(`${dir.src}/**.ts`, ['tslint'])
  gulp.watch(`${dir.test}/**.js`, ['eslint'])
})

gulp.task('pre-test', ['build', 'lint'])

gulp.task('test', ['pre-test', 'check-links'], () => {
  return gulp
    .src([`${dir.test}/**.js`])
    .pipe(mocha())
})

gulp.task('doc', () => {
  return gulp
    .src(['src/**.ts'])
    .pipe(typedoc({
      // TypeScript options
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

gulp.task('image', () => {
  return gulp.src(`${dir.images}/**`)
    .pipe(imagemin())
    .pipe(gulp.dest(`${dir.images}/`))
})

gulp.task('clean', () => {
  return del([
    `${dir.coverage}/`,
    `${dir.build}/`,
    '**.log'
  ])
})

gulp.task('default', ['build'])
