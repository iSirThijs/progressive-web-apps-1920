const gulp = require('gulp')

return gulp.src([
  './src/assets/images/**/*.*'
])
  .pipe(gulp.dest('./static/images'))