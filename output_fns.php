<?php

function do_html_header($title)
{
  // print an HTML header
?>
  <html>
  <head>
    <title><?php echo $title;?></title>
	<link rel="stylesheet" href="./bootstrap.min.css" >
	<script src="./jquery-3.2.1.slim.min.js" ></script>
	<script src="./popper.min.js" ></script>
	<script src="./bootstrap.min.js" ></script>
	<link rel="stylesheet" href="./css/style.css" >
  </head>
  <body>
  <div class="container">
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
	<button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02"
    aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>

  <div class="collapse navbar-collapse" id="navbarTogglerDemo02">
    <ul class="navbar-nav mr-auto mt-2 mt-lg-0">
      <li class="nav-item">
        <a class="nav-link" href="lightsMenu.php"><img src="assets/light-bulb-grey.svg" width="40" height="40" class="d-inline-block align-top" alt=""> Lighting<span class="sr-only"></span></a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="#"><img src="assets/watering_grey.svg" width="30" height="30" class="d-inline-block align-top" alt="">Manage Irrigation</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="change_passwd_form.php"><img src="assets/cam-grey.svg" width="30" height="30" class="d-inline-block align-top" alt=""> Security</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="change_passwd_form.php"><img src="assets/settings_greysvg.svg" width="30" height="30" class="d-inline-block align-top" alt="">Settings</a>
      </li>
	   <li class="nav-item">
        <a class="nav-link" href="logout.php"><img src="assets/settings_greysvg.svg" width="30" height="30" class="d-inline-block align-top" alt="">Logout</a>
      </li>
      <button type="button" class="btn btn-primary">
        Notifications <span class="badge badge-light">4</span>
      </button>
    </ul>
  </div>
</nav>
  <h1 align="center" style="color:green;">&nbsp;MIN Home Automation</h1>
  <hr />
  </div>
<?php
  if($title)
    do_html_heading($title);
}

function do_html_footer()
{
  // print an HTML footer
?>
  </body>
  </html>
<?php
}

function do_html_heading($heading)
{
  // print heading
?>
  <h2><?php echo $heading;?></h2>

<?php
}

function do_html_URL($url, $name)
{
  // output URL as link and br
?>
  <br /><a href="<?php echo $url;?>"><?php echo $name;?></a><br />
<?php
}

function display_site_info()
{
  // display some marketing info
?>
  <ul>
  <li>Manage your lighting from anywhere, automatically and via voice command</li>
  <li>Manage your plants easily</li>
  <li>Secure your home</li>
  </ul>
<?php
}

function display_login_form()
{
?>
  <a href='register_form.php'>Create a new user</a>
  <form method='post' action='member.php'>
  <table bgcolor='#cccccc'>
   <tr>
     <td colspan=2>Members log in here:</td>
   <tr>
     <td>Username:</td>
     <td><input type='text' name='username'></td></tr>
   <tr>
     <td>Password:</td>
     <td><input type='password' name='passwd'></td></tr>
   <tr>
     <td colspan=2 align='center'>
     <input type='submit' value='Log in'></td></tr>
   <tr>
     <td colspan=2><a href='forgot_form.php'>Forgot your password?</a></td>
   </tr>
 </table></form>
<?php
}

function display_registration_form()
{
?>
 <form method='post' action='register_new.php'>
 <table bgcolor='#cccccc'>
   <tr>
     <td>Email address:</td>
     <td><input type='text' name='email' size=30 maxlength=100></td></tr>
   <tr>
     <td>Preferred username <br />(max 16 chars):</td>
     <td valign='top'><input type='text' name='username'
                     size=16 maxlength=16></td></tr>
   <tr>
     <td>Password <br />(between 6 and 16 chars):</td>
     <td valign='top'><input type='password' name='passwd'
                     size=16 maxlength=16></td></tr>
   <tr>
     <td>Confirm password:</td>
     <td><input type='password' name='passwd2' size=16 maxlength=16></td></tr>
   <tr>
     <td colspan=2 align='center'>
     <input type='submit' value='Register'></td></tr>
 </table></form>
<?php

}

function display_user_menu()
{
  // display the menu options on this page
?>
<hr />
<a href="member.php">Home</a> &nbsp;|&nbsp;
<a href="lightsMenu.php">Manage Lights</a> &nbsp;|&nbsp;
<a href="#">Manage Irrigation</a> &nbsp;|&nbsp;
<a href="change_passwd_form.php">Manage Security</a>
<br />
<br />
<a href="change_passwd_form.php">Change Password</a>
<a href="logout.php">Logout</a>
<hr />

<?php
}


function display_password_form()
{
  // display html change password form
?>
   <br />
   <form action='change_passwd.php' method='post'>
   <table width=250 cellpadding=2 cellspacing=0 bgcolor='#cccccc'>
   <tr><td>Old password:</td>
       <td><input type='password' name='old_passwd' size=16 maxlength=16></td>
   </tr>
   <tr><td>New password:</td>
       <td><input type='password' name='new_passwd' size=16 maxlength=16></td>
   </tr>
   <tr><td>Repeat new password:</td>
       <td><input type='password' name='new_passwd2' size=16 maxlength=16></td>
   </tr>
   <tr><td colspan=2 align='center'><input type='submit' value='Change password'>
   </td></tr>
   </table>
   <br />
<?php
};

function display_forgot_form()
{
  // display HTML form to reset and email password
?>
   <br />
   <form action='forgot_passwd.php' method='post'>
   <table width=250 cellpadding=2 cellspacing=0 bgcolor='#cccccc'>
   <tr><td>Enter your username</td>
       <td><input type='text' name='username' size=16 maxlength=16></td>
   </tr>
   <tr><td colspan=2 align='center'><input type='submit' value='Change password'>
   </td></tr>
   </table>
   <br />
<?php
};

?>
