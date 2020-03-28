const gulp = require('gulp')
const concat = require('gulp-concat');
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');

return gulp.src([
  './src/assets/css/defaults.css',
  './src/assets/css/header.css',
  './src/assets/css/nav.css',
  './src/assets/css/main.css',
  './src/assets/css/notifications.css',
  './src/assets/css/no-js.css',
  './src/assets/css/mediaqueries.css',
	'./src/assets/css/*.css'
])
  .pipe(concat('index.css'))
  .pipe(cleanCSS())
  .pipe(autoprefixer({
    cascade: false
  }))
  .pipe(gulp.dest('./static/'))