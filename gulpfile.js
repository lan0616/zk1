var gulp = require('gulp');
var sass = require('gulp-sass');
var minCss = require('gulp-clean-css');

//使用gulp实现css压缩
gulp.task('minCss', function() {
    return gulp.src('./src/sass/*.scss')
        .pipe(sass())
        .pipe(minCss())
        .pipe(gulp.dest('./src.css'));
});