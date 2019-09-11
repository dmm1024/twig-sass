const { task, src, dest, watch, series, parallel } = require('gulp');
const twig = require('gulp-twig');
const bs = require('browser-sync').create();
const rename = require('gulp-rename');
const sass = require('gulp-sass');

task('htmlTask', () => {
  return src('./src/twig_template.html')
    .pipe(twig())
    .pipe(rename('index.html'))
    .pipe(dest('./dest'))
    .pipe(bs.stream());
});

task('cssTask', () => {
  return src('./src/styles/main.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(dest('./dest/styles'))
    .pipe(bs.stream());
});

task('jsTask', () => {
  return src('./src/**/*.js')
    .pipe(dest('./dest'))
    .pipe(bs.stream());
});

task('serve', () => {
  bs.init({
    server: {
      baseDir: './dest'
    }
  })
});

task('watch', cb => {
  watch('./src/**/*.html', series('htmlTask')).on('change', bs.reload);
  watch('./src/**/*.scss', series('cssTask')).on('change', bs.reload);
  watch('./src/**/*.js', series('jsTask')).on('change', bs.reload);

  cb();
});

task('build', parallel('htmlTask', 'cssTask', 'jsTask'));

task('default', series('build', 'watch', 'serve'));