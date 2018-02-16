create database MinHomeAutomation;
use MinHomeAutomation;

create table user  (
  username varchar(16) primary key,
  passwd char(40) not null,
  email varchar(100) not null
);

CREATE TABLE IF NOT EXISTS componentusage(
  compUsageId bigint(20) NOT NULL AUTO_INCREMENT,
  componentName text NOT NULL,
  componentLocation text NOT NULL,
  floorLocaltion text,
  timeOn datetime,
  timeOff datetime,
  type text,
  status BOOLEAN,
  PRIMARY KEY (compUsageId)
  
);

CREATE TABLE latestUsage (
  lastestUsageId bigint(20) NOT NULL,
  lastOff datetime NOT NULL
);

grant select, insert, update, delete
on MinHomeAutomation.*
to home_user@localhost identified by 'password';
