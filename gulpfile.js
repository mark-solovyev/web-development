
const gulp = require("gulp");
const rm = require("gulp-rm");
const pug = require ("gulp-pug");
const sass = require("gulp-sass");
sass.compiler = require("node-sass");
const browserSync = require("browser-sync").create();
const webpackStream = require("webpack-stream");
const imagemin = require("gulp-imagemin");
const gulpif = require("gulp-if");

const KAKASHKA = process.env.KAKASHKA;

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

// CLEAN
gulp.task("html:clean", ()=> {
    return gulp.src(PATH.dest.htmlFiles, {read: false})
        .pipe(rm());
});
gulp.task("styles:clean", ()=> {
    return gulp.src(PATH.dest.cssFiles)
        .pipe(rm());
});
gulp.task("scripts:clean", ()=> {
    return gulp.src("./dist/scripts/**/*.js")
        .pipe(rm());
});
gulp.task("images:clean", ()=> {
    return gulp.src("./dist/images/**/*")
        .pipe(rm());
});
// BUILD
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
gulp.task("scripts:build", ()=> {
    return gulp.src("./src/scripts/entry.js")
        .pipe(webpackStream( require("./webpack.config.js") ))
        .pipe(gulp.dest("./dist/scripts/"));
});
gulp.task("images:copy", ()=> {
    return gulp.src("./src/images/**/*")
        .pipe(gulpif(KAKASHKA === "prod", imagemin()))
        .pipe(gulp.dest("./dist/images/"));
});
// SERVER
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
// Default Task
gulp.task("default", gulp.series(
    gulp.parallel("html:clean", "styles:clean", "scripts:clean", "images:clean"),
    gulp.parallel("html:build", "styles:build", "scripts:build", "images:copy"),
    "server:run"
));
// Watchers
gulp.watch(PATH.src.views, gulp.series("html:clean", "html:build", "server:reload"));
gulp.watch(PATH.src.styles, gulp.series("styles:clean", "styles:build", "server:reload"));
gulp.watch("./src/scripts/", gulp.series("scripts:clean", "scripts:build", "server:reload"));
gulp.watch("./src/images/", gulp.series("images:clean", "images:copy", "server:reload"));
