const gulp = require("gulp");
const babel = require("gulp-babel");

gulp.task("babel", function () {
  return gulp.src("src/js/main.js")
    .pipe(babel())
    .pipe(gulp.dest("dist/js/"));
});

gulp.task("build-dist", function () {
  return gulp.src("src/**/*")
    .pipe(gulp.dest("dist"));
});

gulp.task('default', ['build-dist', 'babel']);