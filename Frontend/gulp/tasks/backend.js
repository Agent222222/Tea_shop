export const back = () => {
    return app.gulp.src(app.path.src.server)
        .pipe(app.gulp.dest(app.path.build.server))
}