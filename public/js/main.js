'use strict';

$( document ).ready( function() {

    var socket = io.connect( window.location.href );

    var buttonsNodeList = document.getElementsByTagName( 'button' );
    var buttons = [];

    // create a snapshop
    for ( var i in buttonsNodeList ) {
        buttons[i] = buttonsNodeList[i];
    }

    // bind listener
    buttons.forEach( function( button ) {
        button.addEventListener( 'click', function( e ) {
            e.preventDefault();

            var state = this.getAttribute( 'data-state' );
            socket.emit( 'light', { state: state });

        }, false );
    });


    // var div = document.createElement( 'div' );
});