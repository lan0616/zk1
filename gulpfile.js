var gulp = require('gulp');
var sass = require('gulp-sass');
var minCss = require('gulp-clean-css');
var uglify = require('gulp-uglify');
var path = require('path');
var fs = require('fs');
var server = require('gulp-webserver');
//使用gulp实现css压缩
gulp.task('minCss', function() {
    return gulp.src('./src/sass/*.scss')
        .pipe(sass())
        .pipe(minCss())
        .pipe(gulp.dest('./src/css'));
});
//监听sass 
gulp.task('watch', function() {
    return gulp.src('./src/sass/*.scss'), gulp.series('minCss')
})


//起服务
// gulp.task('server', function() {
//     return gulp.watch(server({
//         port: 9900,
//         middleware: function(req, res, next) {
//             var pathname = url.parse(req.url, true).pathname;
//             if (pathname === '/favicon.ico') {
//                 return res.end('');
//             }
//             console.log(pathname);
//         }
//     }))
// })

gulp.task('server', gulp.watch(server({
    port: 9900,
    middleware: function(req, res, next) {
        var pathname = url.parse(req.url, true).pathname;
        if (pathname === '/favicon.ico') {
            return res.end('');
        }
        if (pathname === '/api/shuju')
            console.log(pathname);
    }
})))


//使用gulp实现js压缩
gulp.task('uglify', function() {
    return gulp.src(['./src/js/**/*.js'], ['!./src/js/libs/*.js'])
        .pipe(uglify())
        .pipe(gulp.dest('build'))
});
gulp.task('dev', gulp.series('minCss', 'server', 'uglify', 'watch'));