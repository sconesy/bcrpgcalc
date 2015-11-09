const browserify = require("browserify"),
      babelify = require("babelify"),
      gulp = require("gulp"),
      gutil = require("gulp-util"),
      source = require("vinyl-source-stream"),
      // I don't think we need this
      //sourcemaps = require("gulp-sourcemaps"),
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
    entries: ["src/index.jsx"],
    debug: true
  });

  if (doWatch) {
    b = watchify(b);
    b.on("update", bundle.bind(null, b, doWatch));
    b.on("log", gutil.log);
  }

  b.transform(babelify, {
    presets: ["es2015", "react", "stage-0"]
  });

  return bundle(b);
} 

gulp.task("build", doBundle);

gulp.task("watch", doBundle.bind(null, true));

gulp.task("default", ["build"]);
