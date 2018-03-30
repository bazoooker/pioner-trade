var gulp      	    = require('gulp'), // Подключаем Gulp
    sass            = require('gulp-sass'), //Подключаем Sass пакет,
    browserSync     = require('browser-sync').create(); // Подключаем Browser Sync
    autoprefixer    = require('gulp-autoprefixer'); // Подключаем автопрефиксер
    notify          = require("gulp-notify");



gulp.task('serve', ['sass'], function() {

    browserSync.init({
        server: {
          baseDir: "distrib"
        },
        notify: true
    });

    gulp.watch("dev/scss/**/*.scss", ['sass']);
    gulp.watch("distrib/*.html").on('change', browserSync.reload);    
});

// Compile sass into CSS & auto-inject into browsers
gulp.task('sass', function() {
    return gulp.src("dev/scss/**/*.scss")
        .pipe(sass())
        .pipe(autoprefixer({
            browsers: ['last 6 versions'],
            cascade: false
        }))
        .pipe(gulp.dest("distrib/css"))
        .pipe(notify("Css injected!", 300))
        .pipe(browserSync.stream())
});

gulp.task('default', ['serve']);







