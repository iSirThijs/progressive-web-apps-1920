const gulp = require('gulp')

return gulp.src([
  './src/assets/service-worker.js',
  './src/assets/manifest.json',
])
  .pipe(gulp.dest('./static/'))