GPIO API
======================================================

var states = {
    'HIGH': 1,
    'LOW': 0
};

var _stack [] private static
    list of the opened gpio pins



function clean()
    static public
    loop _stack and clean the mess

function create( pinId ) {
    this.pin = pinId
}

function digitalWrite( int[, callback ?] )
    @int    [ 0, 1 ] ['HIGH', 'LOW']
    @return false or error
        -> launch callback( err );