var gulp = require('gulp');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var cssmin = require('gulp-cssmin');

var jsSource = './front/js/*.js';
var jsOutput = './public';
var cssSource = './front/css/*.css';
var cssOutput = './public';

gulp.task('js', function() {
    return gulp.src(jsSource)
        .pipe(concat('javascriptz.js'))
        .pipe(gulp.dest(jsOutput));
});

gulp.task('jsmini', function() {
    return gulp.src(jsSource)
        .pipe(concat('javascriptz.js'))
        .pipe(uglify())
        .pipe(gulp.dest(jsOutput));
});

gulp.task('css', function() {
    return gulp.src(cssSource)
        .pipe(concat('hardstylez.css'))
        .pipe(gulp.dest(cssOutput));
});

gulp.task('cssmini', function() {
    return gulp.src(cssSource)
        .pipe(concat('hardstylez.css'))
        .pipe(cssmin())
        .pipe(gulp.dest(cssOutput));
});

gulp.task('dev', ['js', 'css']);
gulp.task('prod', ['jsmini', 'cssmini']);