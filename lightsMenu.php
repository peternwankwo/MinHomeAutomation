<div class="container">
<?php
require_once('min_auto_fns.php');
do_html_header('Home');
if (isset($_POST['LightON']))
{
	//kill all processes started by the lightsPIR2.py
	exec("pkill -f lightsPIR2.py");

	//execute script to turn lightsON
	exec("python /var/www/html/MIN/lightsON2.py");
}
if (isset($_POST['LightOFF']))
{
	exec("pkill -f lightsPIR2.py");

	exec("python /var/www/html/MIN/lightsOFF.py");
}
if (isset($_POST['LightAUTO']))
{
	exec("python /var/www/html/MIN/lightsPIR2.py");
}


?>



<form method="post">
<button class="btn btn-primary" name="LightON">Light ON</button>&nbsp;
<button class="btn btn-success" name="LightOFF">Light OFF</button><br><br>
<button class="btn btn-danger" name="LightAUTO">Light AUTO</button><br><br>



<div class="switch">
  <label class="labelLight">Light 1</label>
  <span class="labelSwitchIsOff">OFF</span>
  <div>
      <input id="switch1" class="cmn-toggle cmn-toggle-round-flat" type="checkbox" status="OFF" onclick="getStatus(this)">
      <label id="switch1label" for="switch1"></label>
  </div>
  <span class="labelSwitchIsOn">ON</span>
</div>

<div class="switch">
  <label class="labelLight">Light 2</label>
  <span class="labelSwitchIsOff">OFF</span>
  <div>
      <input id="switch2" class="cmn-toggle cmn-toggle-round-flat" type="checkbox" status="OFF" onclick="getStatus(this)">
      <label id="switch2label" for="switch2"></label>
  </div>
  <span class="labelSwitchIsOn">ON</span>
</div>

<hr/>

<div class="switch">
  <label class="labelLight">Auto</label>
  <span class="labelSwitchIsOff">OFF</span>
  <div>
    <input id="switch3" class="cmn-toggle cmn-toggle-round-flat" type="checkbox" status="OFF" onclick="getStatus(this)">
    <label id="switch3label" for="switch3"></label>
  </div>
  <span class="labelSwitchIsOn">ON</span>
</div>




</form>
<?php
//display our wow factor
display_site_info();

// give menu of options
display_user_menu();

do_html_footer();
?>
</div>