const browserify = require("browserify"),
      babelify = require("babelify"),
      gulp = require("gulp"),
      gutil = require("gulp-util"),
      myth = require("gulp-myth"),
      source = require("vinyl-source-stream"),
      // I don't think we need this
      //sourcemaps = require("gulp-sourcemaps"),
      watch = require("gulp-watch"),
      watchify = require("watchify");

function bundle(b, isRebuild) {
  if (isRebuild) gutil.log("Rebuilding bundle...");

  return b.bundle()
    .on("error", gutil.log.bind(gutil, "[browserify]"))
    .pipe(source("bundle.js"))
    /*
    .pipe(sourcemaps.init({ loadMaps: true }))
    .pipe(sourcemaps.write()))
    */
    .pipe(gulp.dest("dist/"));
}

function doBundle(cb, doWatch) {
  var b = browserify({
    extensions: [".jsx", ".js"],
    entries: ["src/index.jsx"],
    debug: true
  });

  if (doWatch) {
    b = watchify(b);
    b.on("update", bundle.bind(null, b, doWatch));
    b.on("log", gutil.log);
  }

  b.transform(babelify, {
    presets: ["react", "stage-0", "es2015"],
    plugins: [
      "transform-class-properties"
    ]
  });

  return bundle(b);
} 

function buildCss(cb, doWatch) {
  var cssStream = gulp.src("style.css");

  if (doWatch) {
    cssStream = cssStream.pipe(watch("style.css"));
  } 

  return cssStream.pipe(myth()).pipe(gulp.dest("dist/"));
}

gulp.task("build-js", doBundle);

gulp.task("build-css", buildCss);

gulp.task("build", ["build-js", "build-css"]);

gulp.task("watch-js", doBundle.bind(null, true));

gulp.task("watch-css", buildCss.bind(null, true));

gulp.task("watch", ["watch-js", "watch-css"]);

gulp.task("default", ["build"]);
