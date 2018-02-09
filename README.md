# MinHomeAutomation

On your PC:
1.)	Install WAMP: http://www.wampserver.com/en/
2.)	Test WAMP installation: http://localhost
3.)	Download the repository from git
4.)	Create a folder MinHomeAutomation in “\wamp\www”
5.)	Copy the files from GIT to your WAMP folder “\wamp\www\MinHomeAutomation”: https://github.com/peternwankwo/MinHomeAutomation.git
6.)	Open PHP my admin and import file “database.sql” to create the database and user
7.)	Access the POC application http://localhost/MinHomeAutomation

On your Raspberry Pi

1.) Install RASPBIAN STRETCH WITH DESKTOP: https://www.raspberrypi.org/downloads/raspbian/
2.) Update your raspberry Pi: 
apt-get update
apt-get upgrade
apt-get dist-upgrade
apt-get install raspberrypi-ui-mods
3.) install php, apache, mysql
4.) go to root cd/var/www/html/
5.) create a folder MinHomeAutomation
6.) change to the MinHomeAutomation directory cd MinHomeAutomation
7.) Git clone : https://github.com/peternwankwo/MinHomeAutomation.git
