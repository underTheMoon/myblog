var gulp=require('gulp');
/*图片压缩*/
var imagemin=require('gulp-imagemin');

gulp.task('imagemin',function(){
    gulp.src('images/*.*')
        .pipe(imagemin({progressive: true}))
        .pipe(gulp.dest('dist/images'))
})

gulp.task('default',['imagemin'])