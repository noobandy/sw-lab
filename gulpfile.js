const gulp = require('gulp')
const webpak = require('webpack')
const webpackConfig = require('./webpack.config')
const del = require('del')
const replace = require('gulp-string-replace')
const bump = require('gulp-bump');
const prompt = require('gulp-prompt')

gulp.task('clean', function(cb) {
    return del(['dist'])
})

gulp.task('webpack', ['clean'], function(cb) {

    webpak(webpackConfig, function(err, stats) {
        if(err || stats.hasErrors()) {
            return cb(err)
        }

        console.log("build complete")

        
        cb(null)
    })
})

gulp.task('generate-service-worker',['webpack'], function(callback) {
    var swPrecache = require('sw-precache');
    var rootDir = 'app';
  
    swPrecache.write('sw.js', {
        dontCacheBustUrlsMatching : '/./',
        staticFileGlobs: ['dist/**/*.{js,css,png,jpg,gif,svg,eot,ttf,woff}'],
        stripPrefix: 'dist'
    }, callback);
});

gulp.task('build', ['generate-service-worker'], function(cb) {
    return Promise.all([new Promise(function(resolve, reject) {
         // copy service worker to dist folder
        gulp.src('sw.js')
        .on('error', reject)
        .pipe(gulp.dest('dist'))
        .on('end', resolve)
    }), new Promise(function(resolve, reject) {

        gulp.src('package.json').pipe(prompt.prompt([{
            type: 'list',
            name: 'releaseType',
            message: 'Please enter release type',
            choices: ['none', 'major', 'minor', 'patch']
        }], function(userResponse) {
            if(userResponse.releaseType && userResponse.releaseType !== 'none') {
                gulp.src('package.json')
                .pipe(bump({type: userResponse.releaseType}))
                .on('error', reject)
                .pipe(gulp.dest('./'))
                .on('end', resolve)
            }
        }))
    })]).then(function() {
        const pkg = require('./package.json')
        gulp.src('dist/index.html', { base: 'dist'})
        .pipe(replace(new RegExp('@version@', 'g'), pkg.version)).
        pipe(gulp.dest('dist'))
    })
})



gulp.task('default', function() {
    console.log("default task")
})