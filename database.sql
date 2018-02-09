create database MinHomeAutomation;
use MinHomeAutomation;

create table user  (
  username varchar(16) primary key,
  passwd char(40) not null,
  email varchar(100) not null
);

CREATE TABLE IF NOT EXISTS `componentusage` (
  compUsageId bigint(20) NOT NULL,
  componentName text NOT NULL,
  componentLocation text NOT NULL,
  floorLocaltion text,
  timeOn datetime,
  timeOff datetime
);

create table bookmark (
  username varchar(16) not null,
  bm_URL varchar(255) not null,
  index (username),
  index (bm_URL)
);

grant select, insert, update, delete
on MinHomeAutomation.*
to home_user@localhost identified by 'password';
