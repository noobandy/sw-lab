'use strict'

/**
 * Static HTTP Server
 *
 * Create a static file server instance to serve files
 * and folder in the './public' folder
 */

// modules
const nodeStatic = require( 'node-static' ),
    port = 8080,
    http = require( 'http' )

// config
const file = new nodeStatic.Server( './dist', {
    cache: false,
    gzip: true
} )

// serve
http.createServer( function ( request, response ) {
    request.addListener( 'end', function () {
        file.serve( request, response );
    } ).resume();
} ).listen( port , function(err, res) {
    console.log(`server running at port ${port}`)
})