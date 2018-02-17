<?php
include 'db.php';
require 'codeguy-Slim/Slim/Slim.php';
\Slim\Slim::registerAutoloader();
use \Slim\Slim AS Slim;
// create new Slim instance
$app = new Slim();

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Max-Age: 1000");
header("Access-Control-Allow-Headers: X-Requested-With, Content-Type, Origin, Cache-Control, Pragma, Authorization, Accept, Accept-Encoding");
header("Access-Control-Allow-Methods: PUT, POST, GET, OPTIONS, DELETE");

$app->get("/v1", function () {
    echo "<h1>Welcome to MIN Automation</h1>";
});
$app->get('/v1/beacon', function () {
				$result = null;
				
				$username = 'alishapatel2006-gmail-com--jad';
				$password = 'ce3d89e4be9a769738f9715769248ca4';
				$url='https://cloud.estimote.com/v2/devices';
				
				$ch = curl_init();
				curl_setopt($ch, CURLOPT_URL, $url);
				curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
				curl_setopt($ch, CURLOPT_USERPWD, "$username:$password");
				curl_setopt($ch, CURLOPT_HTTPAUTH, CURLAUTH_BASIC);
				$output = curl_exec($ch);
				$info = curl_getinfo($ch);
				curl_close($ch);

				echo $output;
				//echo json_encode($info);
});

$app->get('/v1/beacon/info', function () {
				$result = null;
				
				$username = 'alishapatel2006-gmail-com--jad';
				$password = 'ce3d89e4be9a769738f9715769248ca4';
				$url='https://cloud.estimote.com/v2/devices';
				
				$ch = curl_init();
				curl_setopt($ch, CURLOPT_URL, $url);
				curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
				curl_setopt($ch, CURLOPT_USERPWD, "$username:$password");
				curl_setopt($ch, CURLOPT_HTTPAUTH, CURLAUTH_BASIC);
				$output = curl_exec($ch);
				$info = curl_getinfo($ch);
				curl_close($ch);

				//echo $output;
				echo json_encode($info);
});


// run the Slim app
$app->run();
?>