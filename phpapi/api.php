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
$app->get('/v1/:name', function ($name) {
    echo "Hello, $name";
});

$app->get('/v1/:key/status',
function ($key) use ($app) {
   try{
	if($key == 'cOjxzK4vGc7310'){
    $request = $app->request();

			   try {

				  $result = null;

					$sql = "SELECT * FROM componentusage";

					$db = getDB();
					$stmt = $db->prepare($sql);
					$stmt->execute();
					 $allRoutes = $stmt->fetchAll();
					 $db = null;
					 $result = null;
					 $result = '{"resultObj":{"usage":'.json_encode($allRoutes).',"status":"SUCCESS"}}';

				  echo $result;

			   } catch(PDOException $e) {
				  //error_log($e->getMessage(), 3, '/var/tmp/php.log');
				  echo '{"error":{"text":'. $e->getMessage() .'}}';
			   }
	}else{
		 echo '{"error":{"text":"Invalid API key"}}';
	}
}catch(PDOException $e) {
      //error_log($e->getMessage(), 3, '/var/tmp/php.log');
      echo '{"error":{"text":'. $e->getMessage() .'}}';
   }
});

$app->get('/v1/:key/:userid/:serviceid',
function ($key,$userid,$serviceid) use ($app) {
   try{
	if($key == 'cOjxzK4vGc7310'){
    $request = $app->request();

			   try {

				  $result = null;

					$sql = "SELECT * FROM userserviceusage WHERE userid = $userid AND serviceid = $serviceid";

					$db = getDB();
					$stmt = $db->prepare($sql);
					$stmt->execute();
					 $allRoutes = $stmt->fetchAll();
					 $db = null;
					 $result = null;
					 $result = '{"resultObj":{"servicestatus":'.json_encode($allRoutes).',"status":"SUCCESS"}}';

				  echo $result;

			   } catch(PDOException $e) {
				  //error_log($e->getMessage(), 3, '/var/tmp/php.log');
				  echo '{"error":{"text":'. $e->getMessage() .'}}';
			   }
	}else{
		 echo '{"error":{"text":"Invalid API key"}}';
	}
}catch(PDOException $e) {
      //error_log($e->getMessage(), 3, '/var/tmp/php.log');
      echo '{"error":{"text":'. $e->getMessage() .'}}';
   }
});



// run the Slim app
$app->run();
?>