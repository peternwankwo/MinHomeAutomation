<?php

function db_connect()
{
   $result = new mysqli('localhost', 'home_user', 'password', 'MinHomeAutomation'); 
   if (!$result)
     throw new Exception('Could not connect to database server');
   else
     return $result;
}

?>
