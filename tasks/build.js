'use strict';
/*jslint node: true */

var pathUtil = require('path');
var Q = require('q');
var gulp = require('gulp');
var sass = require('gulp-sass');
var jetpack = require('fs-jetpack');
var Writable = require('stream').Writable;

var utils = require('./utils');
var generateSpecsImportFile = require('./generate_specs_import');

var gulp = require("gulp");
var browserify = require("browserify");
var babelify = require("babelify");
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var sourcemaps = require('gulp-sourcemaps');


var projectDir = jetpack;
var srcDir = projectDir.cwd('./app');
var destDir = projectDir.cwd('./build');

var paths = {
    copyFromAppDir: [
        './node_modules/**',
        './vendor/**',
        './**/*.html',
        './background.js'
    ],
};

// -------------------------------------
// Tasks
// -------------------------------------

gulp.task('clean', function(callback) {
    return destDir.dirAsync('.', {
        empty: true
    });
});


var copyTask = function() {
    return projectDir.copyAsync('app', destDir.path(), {
        overwrite: true,
        matching: paths.copyFromAppDir
    });
};
gulp.task('copy', ['clean'], copyTask);
gulp.task('copy-watch', copyTask);


var bundle = function(src, dest) {
    var deferred = Q.defer();
    var writer = new Writable();

    writer.on('finish', function() {
        deferred.resolve();
    });

    var b = browserify({
        entries: src,
        debug: true,
        // defining transforms here will avoid crashing your stream
        transform: [babelify],
        out: pathUtil.basename(dest)
    });

    b.bundle()
        .pipe(source(src))
        .pipe(buffer())
        // .pipe(sourcemaps.init({loadMaps: true}))
        // Add transformation tasks to the pipeline here.
        // .pipe(uglify())
        // .on('error', gutil.log)
        // .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest(dest));
    // .pipe(writer);

    // browserify({
    //         debug: true
    //     })
    //     .transform(babelify)
    //     .require(src, {
    //         entry: true
    //     })
    //     .bundle()
    //     .on("error", function(err) {
    //         console.log("Error: " + err.message);
    //         deferred.reject();
    //     })
    //     .pipe(gulp.dest(dest))
    //     .pipe(writer);

    return deferred.promise;
};

var bundleApplication = function() {
    return bundle(srcDir.path('app.jsx'), destDir.path());
};

var bundleSpecs = function() {
    generateSpecsImportFile().then(function(specEntryPointPath) {
        return Q.all([
            bundle(srcDir.path('background.js'), destDir.path('background.js')),
            bundle(specEntryPointPath, destDir.path('spec.js')),
        ]);
    });
};

var bundleTask = function() {
    if (utils.getEnvName() === 'test') {
        return bundleSpecs();
    }
    return bundleApplication();
};
gulp.task('bundle', ['clean'], bundleTask);
gulp.task('bundle-watch', bundleTask);

var sassTask = function() {
    return gulp.src('app/stylesheets/main.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest(destDir.path('stylesheets')));
};
gulp.task('sass', ['clean'], sassTask);
gulp.task('sass-watch', sassTask);

gulp.task('finalize', ['clean'], function() {
    var manifest = srcDir.read('package.json', 'json');
    // Add "dev" or "test" suffix to name, so Electron will write all data
    // like cookies and localStorage in separate places for each environment.
    switch (utils.getEnvName()) {
        case 'development':
            manifest.name += '-dev';
            manifest.productName += ' Dev';
            break;
        case 'test':
            manifest.name += '-test';
            manifest.productName += ' Test';
            break;
    }
    destDir.write('package.json', manifest);

    var configFilePath = projectDir.path('config/env_' + utils.getEnvName() + '.json');
    destDir.copy(configFilePath, 'env_config.json');
});


gulp.task('watch', function() {
    gulp.watch('app/**/*.js', ['bundle-watch']);
    gulp.watch(paths.copyFromAppDir, {
        cwd: 'app'
    }, ['copy-watch']);
    gulp.watch('app/**/*.scss', ['sass-watch']);
});


gulp.task('build', ['bundle', 'sass', 'copy', 'finalize']);
