import RPi.GPIO as gpio
import time
import sys
import MySQLdb
import datetime

i = datetime.datetime.now()

db = MySQLdb.connect("localhost", "phpmyadmin", "password", "MinHomeAutomation")
curs=db.cursor()

print "========================================================= i"
print i


#code for running select statement and displaying table results
#curs.execute ("SELECT * FROM componentUsage")
#for row in curs.fetchall() :
      #data from rows
#        firstname = str(row[0])
#        lastname = str(row[1])

      #print it
#       print "The first name is " + firstname
#        print "The last name is " + lastname

#manual insertion of values in the DB
#curs.execute ("""INSERT INTO componentUsage values(null, 'i', 'skjkjkkjjkkjmall', 'floor', 1234987, 14540)""")


#inserting values using variables
componentN = 'lights'
componentL = 'Living Room'
flr = 'Ground Floor'
tmo = i
tmf = i

sql = ("""INSERT INTO componentUsage(componentName, componentLocation, floor, timeOn) VALUES (%s,%s,%s,%s)""", (componentN, componentL, flr, tmo))
curs.execute(*sql)
db.commit()

ltst = curs.lastrowid

sql2 = ("""INSERT INTO latestUsage(lastestUsageId, lastOff) VALUES (%s,%s)""", (ltst, i))

curs.execute(*sql2)
db.commit()


curs.execute("SELECT * FROM latestUsage")
for i in range(curs.rowcount):

	row = curs.fetchone()
	print row[0], row[1]
	idlatest = row[0]

print "good bye"	

curs.execute("SELECT * FROM componentUsage WHERE usageId=%s", (idlatest,))
for i in range(curs.rowcount):

        row = curs.fetchone()
	print "This is it"
        print row[0], row[1]





#print curs.lastestUsageId
print "herer"


gpio.setwarnings(False)
gpio.setmode(gpio.BOARD)
gpio.setup(3, gpio.OUT)

gpio.output(3, gpio.LOW)

