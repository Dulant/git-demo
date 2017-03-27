/*
1、Less编译 压缩 合并
2、JS合并 压缩 混淆
3、img复制
4、html压缩
 */

// 在gulpfile中先载入gulp包，因为这个包提供了一些API
var gulp = require('gulp');  // 添加一个gulp依赖
var less = require('gulp-less'); //变为css
var cssnano = require('gulp-cssnano');  // css压缩
// 1、Less编译 压缩 合并没有必要，一般预处理CSS都可以导包
gulp.task("style",function () {
    // 这里是在执行style任务时自动执行的
    gulp.src(['src/styles/*.less','!src/styles/_*.less'])
        .pipe(less())
        .pipe(cssnano())
        .pipe(gulp.dest('dist/styles'))
        .pipe(browserSync.reload({
            stream:true
        }));
});
// 2、JS合并 压缩 混淆
var concat = require('gulp-concat'); //合并
var uglify = require('gulp-uglify'); // 压缩、混淆
gulp.task('script',function () {
   gulp.src('src/scripts/*.js')
       .pipe(concat('all.js'))
       .pipe(uglify())
       .pipe(browserSync.reload({
           stream: true
       }));
});


// 3、图片复制
gulp.task('image',function () {
    gulp.src('src/images/*.*')
        .pipe(browserSync.reload({
            stream: true
        }));
});

// 4、HTML
var htmlmin = require('gulp-htmlmin');
gulp.task('html',function () {
    gulp.src('src/*.html')
        .pipe(htmlmin({collapseWhitespace:true,removeComments:true}))
        //collapseWhitespace:true,把空白字符去掉
        // removeComments:false,把注释给删除掉
        .pipe(gulp.dest('dist'))
        .pipe(browserSync.reload({
            stream: true
        })); /*当页面发生变化的时候重新加载一下*/
});

var browserSync = require('browser-sync');
gulp.task('serve',function () {
    browserSync({server: {
        baseDir:['dist']
    }},
        function(err, bs) {
        console.log(bs.options.getIn(["urls", "local"]));
    });
    gulp.watch('src/styles/*.less',["style"]);
    gulp.watch('src/script/*.js',["script"]);
    gulp.watch('src/images/*.*',["images"]);
    gulp.watch('src/*.html',["html"]);
});