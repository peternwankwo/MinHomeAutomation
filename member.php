<?php

// include function files for this application
require_once('min_auto_fns.php'); 
session_start();

//create short variable names
$username = @$_POST['username'];
$passwd = @$_POST['passwd'];

if ($username && $passwd)
// they have just tried logging in
{
  try
  {
    login($username, $passwd);
    // if they are in the database register the user id
    $_SESSION['valid_user'] = $username;
  }
  catch(Exception $e)
  {
    // unsuccessful login
    do_html_header('Problem:');
    echo 'You could not be logged in. 
          You must be logged in to view this page.';
    do_html_url('login.php', 'Login');
    do_html_footer();
    exit;
  }      
}

do_html_header('Home');
check_valid_user();

//display our wow factor
display_site_info();

// give menu of options
display_user_menu();

do_html_footer();
?>