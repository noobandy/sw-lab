'use strict'
var version = '2.0.0'

caches.keys().then(function(cacheNames) {
    return Promise.all(cacheNames.map(function(cacheName) {
        if(!(cacheName.indexOf(version) != -1 ||  cacheName.indexOf('static-assets') != -1)) {
            console.log('Deleting out of date cache:', cacheName);
            
            return caches.delete(cacheName)
        }
    }))
})
