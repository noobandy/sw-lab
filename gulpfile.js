const gulp = require('gulp')
const webpak = require('webpack')
const webpackConfig = require('./webpack.config')
const del = require('del')

gulp.task('clean', function(cb) {
    return del(['dist'])
})

gulp.task('build', ['clean'], function(cb) {

    webpak(webpackConfig, function(err, stats) {
        if(err || stats.hasErrors()) {
            return cb(err)
        }

        console.log("build complete")
        cb(null)
    })
})

gulp.task('default', function() {
    console.log("default task")
})