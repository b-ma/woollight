TALES OF A "WOOLLIGHT"
======================================================

keep it "KISS"

## TODO :

    - order radio elements

## UPGRADE :

    - write the mock._unexport to test it (destroy file or ...) => recheck
    - refactor gpio :
        call mock or real object through config
        create a real stad-alone module
    - implement backbone to manage the front
    - increase logging to monitor the whole app => create a log module
    - find a way to modulate the voltage
        http://txapuzas.blogspot.fr/2009/12/paperdimmerldr-control-de-potencia-de.html
        the whole electronic module must be unobstrusive and must
    - pass all the eletronic stuff through a radio controlled arduino
    - trigger several lamps
    - [design] css3 animation in the front end (random discs)

## FUN :

- make a video


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


The server side
-------------------------------------------------------

Electronics
-------------------------------------------------------










