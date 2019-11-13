
const gulp = require("gulp");
const pug = require ("gulp-pug");

gulp.task("views", ()=> {
    return gulp.src("./src/views/index.pug")
        .pipe(pug())
        .pipe(gulp.dest("./dist"));
});