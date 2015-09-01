/// <binding AfterBuild='touch' ProjectOpened='watch' />
var gulp = require('gulp'),
    typescript = require('typescript')
    ts = require('gulp-typescript'),
    touch = require('touch'),
    open = require('gulp-open'),
    livereload = require('gulp-livereload'),
    run = require('gulp-run');

var paths = {
    index: './GrandOakOrders/index.html',
    typescript: 'GrandOakOrders/app/**/*.ts',
    typings: 'GrandOakOrders/typings/**/*.d.ts',
    app: './GrandOakOrders/app',
    debugUrl: 'http://localhost:52464',
    watchHtml: ['GrandOakOrders/app/**/*.html'],
    watchStyles: ['GrandOakOrders/app/styles/site.less']
};

var tsConfig = {
    typescript: typescript,
    declarationFiles: false,
    noExternalResolve: true,
    target: 'es6',
    emitDecoratorMetadata: true,
    experimentalDecorators: true
};

gulp.task('touch', function () {
    touch(paths.index);
});

gulp.task('open', function() {
    gulp.src(__filename)
        .pipe(open({ uri: paths.debugUrl, app: 'chrome' } ));
});

gulp.task('watch', function () {
    livereload.listen();
    var watcher = gulp.watch(paths.watchHtml);
    watcher.on('change', function (e) {
        console.log(e.path + ' changed. Reloading page...');
        livereload.changed('index.html');
    });

    var styleWatcher = gulp.watch(paths.watchStyles);
    styleWatcher.on('change', function (e) {
        console.log(e.path + ' changed. Reloading...');
        livereload.changed(e);
    });
});

gulp.task('build-ts', function () {
    return gulp.src([paths.typescript, paths.typings],
        {base: paths.app })
    .pipe(ts(tsConfig))
    .js.pipe(gulp.dest(paths.app))
    .pipe(livereload());
});

gulp.task('watch-ts', ['build-ts'], function() {
   gulp.watch([paths.typescript], ['build-ts']);
});

gulp.task('serve', function () {
    run('IISExpress.exe /Site:GrandOakOrders /config:.vs\\config\\applicationhost.config').exec()
        .pipe(gulp.dest('output'));
});

gulp.task('default', ['watch', 'watch-ts', 'open']);