const gulp = require("gulp");
const plumber = require("gulp-plumber");
const sourcemap = require("gulp-sourcemaps");
const less = require("gulp-less");
const postcss = require("gulp-postcss");
const autoprefixer = require("autoprefixer");
const server = require("browser-sync").create();
const csso = require("gulp-csso");
const rename = require("gulp-rename");
const del = require("del");
const babel = require("gulp-babel");
const concat = require("gulp-concat");
const pug = require("gulp-pug");
const javascriptObfuscator = require('gulp-javascript-obfuscator');

gulp.task("css", function () {
  return gulp.src("source/less/style.less")
    .pipe(plumber())
    .pipe(sourcemap.init())
    .pipe(less())
    .pipe(postcss([ autoprefixer() ]))
    .pipe(csso())
    .pipe(rename("style.min.css"))
    .pipe(sourcemap.write("."))
    .pipe(gulp.dest("build/css"))
    .pipe(server.stream());
});

gulp.task("server", function () {
  server.init({
    server: "build/",
    notify: false,
    open: true,
    cors: true,
    ui: false
  });

  gulp.watch("source/less/**/*.less", gulp.series("css"));
  gulp.watch("source/pug/**/*.pug", gulp.series("pug", "refresh"));
  gulp.watch("source/js/*.js", gulp.series("js", "refresh"));
});

gulp.task("refresh", function (done) {
  server.reload();
  done();
});

gulp.task("js", function() {
  return gulp.src("source/js/*.js")
    .pipe(concat('app.js'))
    .pipe(babel({presets: ['@babel/env']}))
    .pipe(javascriptObfuscator())
    .pipe(gulp.dest('build/js'))
});

gulp.task("clean", function () {
  return del("build");
});

gulp.task("pug", function() {
  return gulp.src("source/pug/*.pug")
    .pipe(plumber())
    .pipe(pug({
      pretty: true
    }))
    .pipe(gulp.dest("build"))
});

gulp.task("build", gulp.series("clean", "css", "js", "pug"));
gulp.task("start", gulp.series("build", "server"));
