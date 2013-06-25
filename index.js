var server = require( './lib/server.js' )
  , app    = require( './lib/app.js' )
  , fs     = require( 'fs' )
;

var _config = fs.readFileSync( './config.json' );

_config = JSON.parse( _config.toString() );
_config.server['rootPath'] = process.cwd();

// console.log( _config );

server = server( _config.server );
app.listen( server, _config.app );