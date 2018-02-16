<?php

function db_connect()
{
   $result = new mysqli('localhost', 'phpmyadmin', 'password', 'MinHomeAutomation'); 
   if (!$result)
     throw new Exception('Could not connect to database server');
   else
     return $result;
}

?>
