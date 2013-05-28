TALES OF A "LAMPE EN LAINE"
======================================================

TODO :
make it simple
write about each steps

- wifi         [DONE]

- clean all the mess in that directory

- remove the dependancy with the raspberry to develop locally
    -> remove *
        * use SockJS : https://github.com/sockjs/sockjs-client/blob/master/lib/sockjs.js
    -> develop the server and the UI
        * inject a fake object with a defined API cloning the API should have the gpio part
        * use the simple server template from NODE_JS in Action
    -> DO NOT OVER-INGENEER ! (keep it simple an...)

- deploy on the raspberry
- change the injected object to trigger gpio admin
- configure ftpsync to upload a given file
- deployement
- node server
- electronic

Enjoy !


The wifi experience
-------------------------------------------------------

* * * * * * *

Target :
    - noobs
    - almost any knownlegde or experience with WIFI protocol or wathever it is called

* * * * * * *

The configuration of the wifi on a raspberry pi is a nigthmare:
- TODO list of the nice and helpfull links

not-very-fairplay solution to just make it works (cause you are tired...) :

start the GUI
$ startx

configure with the GUI

come back
$ cat /etc/wpa_supplicant/wpa_supplicant.conf

- it works ! the config is clean !

got back to interfaces
$ nano /etc/network/interfaces

- finally make it work with a static ip is not so hard...













