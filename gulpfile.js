
const gulp = require("gulp");
const rm = require("gulp-rm");
const pug = require ("gulp-pug");
const sass = require("gulp-sass");
sass.compiler = require("node-sass");
const browserSync = require("browser-sync").create();

const PATH = {
    src: {
        views: "./src/views/",
        index: "./src/views/index.pug",
        styles: "./src/styles/",
        main: "./src/styles/main.scss"
    },
    dest: {
        views: "./dist/",
        htmlFiles: "./dist/**/*.html",
        cssFiles: "./dist/styles/**/*.css",
        styles: "./dist/styles/"
    }
}

gulp.task("html:clean", ()=> {
    return gulp.src(PATH.dest.htmlFiles, {read: false})
        .pipe(rm());
});
gulp.task("styles:clean", ()=> {
    return gulp.src(PATH.dest.cssFiles)
        .pipe(rm());
});

gulp.task("html:build", ()=> {
    return gulp.src(PATH.src.index)
        .pipe(pug())
        .pipe(gulp.dest(PATH.dest.views));
});
gulp.task("styles:build", ()=> {
    return gulp.src(PATH.src.main)
        .pipe(sass().on("error", sass.logError))
        .pipe(gulp.dest(PATH.dest.styles));
});
gulp.task("server:run", ()=> {
    browserSync.init({
        server: {
            baseDir: "./dist/"
        },
        open: false
    });
});
gulp.task("server:reload", (done)=> {
    browserSync.reload();
    done();
});

gulp.task("default", gulp.series("html:clean", "html:build", "styles:build", "server:run"));

gulp.watch(PATH.src.views, gulp.series("html:clean", "html:build", "server:reload"));
gulp.watch(PATH.src.styles, gulp.series("styles:clean", "styles:build", "server:reload"));
