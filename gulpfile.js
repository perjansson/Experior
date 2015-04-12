var gulp = require('gulp');
var jshint = require('gulp-jshint');
var mocha = require('gulp-mocha');
var coffee = require('gulp-coffee');
var karma = require('gulp-karma');
require('coffee-script/register');
var beeper = require('beeper');

var EXPRESS_PORT = 4000;
var EXPRESS_ROOT = __dirname;
var LIVE_RELOAD_PORT = 35729;

gulp.task('lint', function () {
    return gulp
        .src(['gulpfile.js', 'src/*.js', 'test/*.js'])
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

var lr;
gulp.task('express', function () {
    var express = require('express');
    var app = express();
    app.use(require('connect-livereload')());
    app.use(express.static(EXPRESS_ROOT));
    app.listen(EXPRESS_PORT);

    // Live reload
    lr = require('tiny-lr')();
    lr.listen(LIVE_RELOAD_PORT);
});

function notifyLivereload(event) {
    var fileName = require('path').relative(EXPRESS_ROOT, event.path);
    lr.changed({
        body: {
            files: [fileName]
        }
    });
    beeper("*");
}

gulp.task('beep', function () {
    beeper("*");
});

gulp.task('unit-test', function () {
    return gulp.src('./foobar.js').pipe(karma({
        configFile: 'karma.conf.js',
        action: 'run'
    }));
});

gulp.task('functional-test', ['express'], function () {
    return gulp
        .src(['test/functional/*.coffee'], {read: false})
        .pipe(coffee({bare: true}))
        .pipe(mocha({
            reporter: 'spec'
        }));
});

gulp.task('default', ['lint', 'express', 'beep'], function () {
    gulp.watch(['**/*.js', '**/*.html', '**/*.css'], notifyLivereload);
});