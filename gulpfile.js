const { src, dest, watch, series } = require('gulp');
const twig = require('gulp-twig');

function deployTwig() {
  return src('./src/twig_template.html')
    .pipe(twig())
    .pipe(dest('./dest/'));
};

function watchTwig() {
  watch('src/**/*.html', series(deployTwig));
};



exports.default = watchTwig;