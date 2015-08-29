/// <binding ProjectOpened='watch-ts' />
var gulp = require('gulp'),
    ts = require('gulp-typescript');

var tsConfig = {
    typescript: require('typescript'),
    declarationFiles: false,
    noExternalResolve: true,
    target: 'es6',
    emitDecoratorMetadata: true,
    experimentalDecorators: true
};

gulp.task('build-ts', function () {
    return gulp.src(['GrandOakOrders/app/**/*.ts', 'GrandOakOrders/typings/**/*.d.ts'],
        {base: "./GrandOakOrders/app"})
    .pipe(ts(tsConfig))
    .js.pipe(gulp.dest('./GrandOakOrders/app'));
});

gulp.task('watch-ts', ['build-ts'], function() {
   gulp.watch(['GrandOakOrders/app/**/*.ts'], ['build-ts']);
});