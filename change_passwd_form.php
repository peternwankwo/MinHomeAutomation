
 <div class="container">
<?php
 require_once('min_auto_fns.php');
 session_start();
 do_html_header('Change password');
 check_valid_user();
 
 display_password_form();

 display_user_menu(); 
 do_html_footer();
?>
</div>
