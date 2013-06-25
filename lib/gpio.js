// require process
var util = require( 'util' ),
    child_process = require( 'child_process' ),
    path = require( 'path' ),
    fs = require( 'fs' )
;

var _states = {
    0: 0,
    LOW: 0,
    1: 1,
    HIGH: 1
}

var _stack = [],
    _gpioAdminPath = '/sys/devices/virtual/gpio/';
    // _gpioAdminPath = './output';

function _unexport( pin ) {
    this.spawn( 'gpio-admin', ['unexport', pin] );
}

function GPIO( pin, direction ) {
    this.pin = pin;
    this.state = 0;
    this.direction = direction || 'out';

    _stack.push( this.pin );
    console.log( util.format( 'GPIO - started on pin %s', this.pin ) );

    this.spawn = child_process.spawn;
    this.spawn( 'gpio-admin', ['export', this.pin] );

    // this.pinDirectory = _gpioAdminPath;
    this.pinDirectory = path.join( _gpioAdminPath, 'gpio' + this.pin );

    // TEST ONLY - create file - gpio admin will do that
    // fs.open( path.join( this.pinDirectory, 'direction' ), 'w', function( err ) {} );
    // fs.open( path.join( this.pinDirectory, 'value' ), 'w', function( err ) {} );


    fs.writeFile( path.join( this.pinDirectory, 'direction' ), this.direction + '\n', (function( err ) {
        if (err) {
            console.log( util.format( 'GPIO - an error occured while setting up pin %s', this.pin ) );
        };
        console.log( util.format( 'GPIO - pin %s is setup to %s', this.pin, this.direction ) );
    }).apply( this ) );
}

GPIO.prototype.digitalWrite = function( value ) {
    var value = _states[value];

    if ( value === undefined || value === this.state ) {
        return;
    };

    fs.writeFile( path.join( this.pinDirectory, 'value' ), value + '\n', (function( err ) {
        if ( err ) {
            console.log( util.format( 'GPIO - an error occured while setting pin %s value to %s', this.pin, value ) );
        }

        this.state = value;
        console.log( util.format( 'GPIO - pin %s switched to %s', this.pin, this.state ) );

    }).apply( this ) );
}

GPIO.prototype.exit = function() {
    _unexport( this._pin );
}


/**
    @static clean
    use :
        process.on( 'exit', function() {
            gpio.clean();
        });
*/
GPIO.exit = function() {
    while( pin = _stack.shift() ) {
        _unexport( pin );
    }
}

module.exports = GPIO;
