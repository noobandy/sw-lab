const gulp = require('gulp')
const webpak = require('webpack')
const webpackConfig = require('./webpack.config')
const del = require('del')
const replace = require('gulp-string-replace')
const bump = require('gulp-bump');
const prompt = require('gulp-prompt')
const swPrecache = require('sw-precache')
const filter = require('gulp-filter')
const uglify = require('gulp-uglify')
const gzip = require('gulp-gzip')

/**
 * then(function(result) {

        return new Promise(function(resolve, reject) {
            const pkg = require('./package.json')
            
            gulp.src('dist/index.html', { base: 'dist'})
            .pipe(replace(new RegExp('@version@', 'g'), pkg.version))
            .on('error', reject)
            .pipe(gulp.dest('dist'))
            .on('end', resolve)
        })
       
    })
 */
gulp.task('clean', function() {
    return del(['dist'])
})

gulp.task('webpack', ['clean'], function() {
    return new Promise(function(resolve, reject) {
        webpak(webpackConfig, function(err, stats) {
            if(err || stats.hasErrors()) {
               return reject(err)
            }

            return resolve(stats)
        })
    })
})

gulp.task('version', function() {

    return new Promise(function(resolve, reject) {
        gulp.src('package.json').pipe(prompt.prompt([{
            type: 'list',
            name: 'releaseType',
            message: 'Please enter release type',
            choices: ['none', 'major', 'minor', 'patch']
        }], function(userResponse) {
            if(userResponse.releaseType && userResponse.releaseType !== 'none') {
                 // bump versions

                return Promise.all([new Promise(function(resolve, reject){
                    
                    gulp.src('package.json')
                    .pipe(bump({type: userResponse.releaseType}))
                    .on('error', reject)
                    .pipe(gulp.dest('./'))
                    .on('end', resolve)

                }), new Promise(function(resolve, reject) {

                    gulp.src('src/I18N/*.json')
                    .pipe(bump({type: userResponse.releaseType}))
                    .on('error', reject)
                    .pipe(gulp.dest('./src/I18N/'))
                    .on('end', resolve)

                }), new Promise(function(resolve, reject) {
                    
                    gulp.src('./clear-old-cache.js')
                    .pipe(bump({type: userResponse.releaseType}))
                    .on('error', reject)
                    .pipe(gulp.dest('./'))
                    .on('end', resolve)
                    
                })]).then(function() {
                    resolve()
                }).catch(function(err) {
                    reject(err)
                })
            }

            return resolve();
        }))

    })
})


gulp.task('build', ['webpack'], function(cb) {

    return new Promise(function(resolve, reject) {
       
        // copy I18N files
        gulp.src('src/I18N/*.json', {base: 'src'})
        .pipe(gulp.dest('dist'))
        .on('error', reject)
        .on('end', resolve)

    }).then(function() {

        // generate service worker
        return new Promise(function(resolve, reject) {
            swPrecache.write('sw.js', {
                cacheId: 'static-assets',
                dontCacheBustUrlsMatching : '/./',
                staticFileGlobs: ['dist/**/*.{js,css,png,jpg,gif,svg,eot,ttf,woff}'],
                stripPrefix: 'dist',
                importScripts: ['clear-old-cache.js'],
                runtimeCaching: [{
                    // I18N json files
                    urlPattern: /I18N\/.+\.json/,
                    // available options cacheFirst/networkFirst/cacheOnly/fastest/networkOnly
                    handler: 'cacheFirst',
                    debug: true,
                    options: {
                        cache: {
                          maxEntries: 1,
                          maxAgeSeconds: 3600,
                          name: `I18N-cache-${require('./package.json').version}`
                        }
                    }
                }]
            }, function(err, result) {
                if(err) {
                    return reject(err)
                }
    
                return resolve(result)
            });
        })
    }).then(function(result) {
        return new Promise(function(resolve, reject) {
            // copy service worker to dist folder
            gulp.src('sw.js')
            .pipe(uglify())
            .on('error', reject)
            .pipe(gulp.dest('dist'))
            .on('end', resolve)
        })

    }).then(function() {
        // copy clear-old-cache js
        return new Promise(function(resolve, reject) {
            gulp.src('./clear-old-cache.js')
            .pipe(uglify())
            .on('error', reject)
            // .pipe(gzip())
            // .on('error', reject)
            .pipe(gulp.dest('dist'))
            .on('error', reject)
            .on('end', resolve)
        })
    }).catch(function(err) {
        console.log(err)
    })
})



gulp.task('default', function() {
    console.log("default task")
})