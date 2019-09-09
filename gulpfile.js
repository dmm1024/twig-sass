const { src, dest, watch, series } = require('gulp');
const twig = require('gulp-twig');
const bs = require('browser-sync').create();
const rename = require('gulp-rename');
const sass = require('gulp-sass');

function deployTwig() {
  return src('./src/twig_template.html')
    .pipe(twig())
    .pipe(rename('index.html'))
    .pipe(dest('./dest'));
};

function styles() {
  return src('./src/styles/main.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(dest('./dest/styles'));
}

function js() {
  return src('./src/**/*.js')
    .pipe()
    .pipe(dest('./dest'))
}

function serve() {
  bs.init({
    server: {
      baseDir: './dest'
    }
  })

  watch('./src/**/*.html', deployTwig).on('change', bs.reload);
  watch('./src/**/*.scss', styles).on('change', bs.reload);
  watch('./src/**/*.js', js).on('change', bs.reload);
}



exports.default = () => {
  series(deployTwig, styles, js);
};