var server = require( './server' ),
    // GPIO   = require( './gpio' ),
    GPIO = require( './gpio-mock' ),
    socket = require( 'socket.io' )
;

var _instance;

function App( server, options ) {
    this._server = server;
    this._config = options;
    this._clients = {};

    this.io = socket.listen( this._server.httpServer );
    this.pin = new GPIO( this._config.pin );

    this.launch();
}

var mapper = {
    'on': 'HIGH',
    'off': 'LOW'
}

App.prototype.getRequest = function() {
    return this._server._request;
}

App.prototype.getResponse = function() {
    return this._server._response;
}

App.prototype.launch = function() {

    // can subscribe to the server event emitter
    // this._server.channel.on( '', function() {})
    (function( app ) {
        app.io.sockets.on( 'connection', function( socket ) {

            app._clients[socket.id] = socket;

            socket.on( 'light', function( data ) {
                if ( !mapper[data.state] ) { return; }

                app.pin.digitalWrite( mapper[data.state] );
            });

            socket.on( 'disconnect', function() {
                delete app._clients[socket.id];
            });
        });
    })( this );
};

// keep it clean...
/* TODO test it
process.on( 'exit', function() {
    console.log( '\n' + '-- exit --' );
    GPIO.exit();
});

process.on( 'SIGINT', function() {
    process.exit();
});

process.on( 'uncaughtException', function( err ) {
    console.log( '\n' + '-- error --' );
    console.log( err );
    process.exit(0);
});
*/

// export
module.exports = {
    listen: function( server, options ) {
        if ( !_instance ) {
            _instance = new App( server, options );
        }

        return _instance;
    }
}

