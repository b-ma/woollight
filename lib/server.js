// dependencies
'use strict';

var http = require( 'http' )
  , mime = require( 'mime' )
  , fs   = require( 'fs' )
  , path = require( 'path' )
  , Events = require( 'events' )
;

var _send404 = function( response ) {
    response.writeHead( 404, { 'Content-Type' : 'text/plain' });
    response.write( 'File not found' );
    response.end();
}

var _sendFile = function( response, filePath, fileContent ) {
    response.writeHead( 200, { 'Content-Type': mime.lookup( path.basename( filePath ) ) });
    response.write( fileContent );
    response.end();
}

var _serveStatic = function( response, cache, filePath, env ) {
    if ( cache[filePath] ) {
        _sendFile( response, filePath, cache[filePath] )
    } else {
        fs.exists( filePath, function( exists ) {
            if ( exists ) {
                fs.readFile( filePath, { encoding: 'utf-8' }, function( err, data ) {
                    if ( err ) {
                        // publish 'file.error' on this.channel
                        _send404( response );
                        // _send500();
                        // publish new Error( 'file.error' );
                    }

                    var fileContent = data.toString();
                    cache[filePath] = fileContent;
                    _sendFile( response, filePath, fileContent );
                });
            } else {
                // publish new Error( 'file.notFound' );
            }
        });
    }

    // empty cache for developpment
    if ( env === 'dev' ) {
        cache = {};
    }
}

var _defaults = {
    "dev": false,
    "prod": false,
}

function Server( options ) {

    if ( !this ) {
        return new Server( options );
    }

    this._request;
    this._response;

    // require( 'utils' ).inherits( this, Events.EventEmitter );
    this.channel = new Events.EventEmitter();

    // process.exit( 0 );
    var _config = (function( defaults, options ) {
            for ( var i in options ) {
                defaults[i] = options[i];

                if ( i === 'env' ) {
                    defaults[options[i]] = true;
                }
            }
            return defaults;
        }( _defaults, options )),

        cache = {};

    // console.log( _config );

    this.httpServer = http.createServer( function( request, response ) {
        this._request = request;
        this._response = response;

        var filePath;

        filePath = request.url === '/' ?
            path.join( _config.rootPath, 'public/index.html' ) :
            path.join( _config.rootPath, '/public', request.url );

        _serveStatic( response, cache, filePath, _config.env );
    });

    this.httpServer.listen( _config.port, function() {
        console.log( 'server listen on port: ' + _config.port )
    });
};

module.exports = Server;


