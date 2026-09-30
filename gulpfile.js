const gulp = require('gulp');
const fileInclude = require('gulp-file-include');
const sass = require('gulp-sass')(require('sass'));
const cssnano = require('gulp-cssnano');
const uglify = require('gulp-uglify');
const imagemin = require('gulp-imagemin');
const browserSync = require('browser-sync').create();

const paths = {
    html: {
        src: 'src/*.html',
        watch: 'src/**/*.html',
        dest: 'dist/'
    },
    styles: {
        src: 'src/scss/**/*.scss',
        dest: 'dist/css/'
    },
    scripts: {
        src: 'src/js/**/*.js',
        dest: 'dist/js/'
    },
    images: {
        src: 'src/imgs/**/*',
        dest: 'dist/imgs/'
    }
};

function html() {
    return gulp.src(paths.html.src)
        .pipe(fileInclude({
            prefix: '@@',
            basepath: '@file'
        }))
        .pipe(gulp.dest(paths.html.dest))
        .pipe(browserSync.stream());
}

function styles() {
    return gulp.src(paths.styles.src)
        .pipe(sass().on('error', sass.logError))
        .pipe(cssnano())
        .pipe(gulp.dest(paths.styles.dest))
        .pipe(browserSync.stream());
}

function scripts() {
    return gulp.src(paths.scripts.src)
        .pipe(uglify())
        .pipe(gulp.dest(paths.scripts.dest))
        .pipe(browserSync.stream());
}

function images() {
    return gulp.src(paths.images.src)
        .pipe(imagemin())
        .pipe(gulp.dest(paths.images.dest))
        .pipe(browserSync.stream());
}

function serve() {
    browserSync.init({
        server: {
            baseDir: './dist'
        },
        port: 3000
    });

    gulp.watch(paths.html.watch, html);
    gulp.watch(paths.styles.src, styles);
    gulp.watch(paths.scripts.src, scripts);
    gulp.watch(paths.images.src, images);
}

const build = gulp.series(gulp.parallel(html, styles, scripts, images));
const watch = gulp.series(build, serve);

exports.html = html;
exports.styles = styles;
exports.scripts = scripts;
exports.images = images;
exports.build = build;
exports.default = watch;