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

$app->get('/v1/:key/services',
function ($key) use ($app) {
   try{
	if($key == 'cOjxzK4vGc7310'){
    $request = $app->request();

			   try {

				  $result = null;
					$sql = "SELECT DISTINCT Type FROM componentUsage";

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

$app->get('/v1/:key/services/:typeName',
function ($key,$typeName) use ($app) {
   try{
	if($key == 'cOjxzK4vGc7310'){
    $request = $app->request();

			   try {

				  $result = null;

					//$sql = "SELECT max(compUsageId) AS compUsageId, componentName, componentLocation,floorLocaltion,timeOn,timeOff,type,status FROM componentusage WHERE type = '$typeName'";
					$sql = "SELECT * FROM componentUsage WHERE type = '$typeName' ORDER BY usageId DESC LIMIT 1;";
					$db = getDB();
					$stmt = $db->prepare($sql);
					$stmt->execute();
					 $allRoutes = $stmt->fetchAll();
					 $db = null;
					 $result = null;
					 $result = '{"resultObj":{"serviceDetail":'.json_encode($allRoutes).',"status":"SUCCESS"}}';

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

$app->get('/v1/:key/services/:typeName/:status',
function ($key,$typeName,$status) use ($app) {
   try{
	if($key == 'cOjxzK4vGc7310'){
    $request = $app->request();
   
			   try {

				  $sql = null;
				  $result = null;
				  $componentName = 'Security System';
				    
				  if($typeName == 'Light'){
					  $componentName = 'Lightning System';
				  }else if($typeName == 'Water'){
					  $componentName = 'Watering System';
				  }
				  
				  if($status == 0){
					  $sql = "INSERT INTO componentUsage (`componentName`,`timeOff`,`type`,`status`)
			VALUES ('$componentName',NOW(),'$typeName',$status)";
			
					exec("pkill -f lightsPIR2.py");
					exec("python /var/www/html/MIN/lightsOFF.py");
	
				  }else{
					//kill all processes started by the lightsPIR2.py
					exec("pkill -f lightsPIR2.py");
					//execute script to turn lightsON
					exec("python /var/www/html/MIN/lightsON2.py");
					
					  $sql = "INSERT INTO componentUsage (`componentName`,`timeOn`,`type`,`status`)
			VALUES ('$componentName',NOW(),'$typeName',$status)";
			
				  }
				//echo $sql;

					//$db = getDB();
					//$stmt = $db->prepare($sql);
					//$res = $stmt->execute();
					
					$res = 1;
					if ($res !=0 ) {
						// $sql = "SELECT max(compUsageId) AS compUsageId, componentName, componentLocation,floorLocaltion,timeOn,timeOff,type,status FROM componentusage WHERE type = '$typeName'";
						$sql = "SELECT * FROM componentUsage WHERE type = '$typeName' ORDER BY usageId DESC LIMIT 1;";
					$db = getDB();
					$stmt = $db->prepare($sql);
					$stmt->execute();
					 $allRoutes = $stmt->fetchAll();
					 $db = null;
					 $result = null;
					 $result = '{"resultObj":{"serviceDetail":'.json_encode($allRoutes).',"status":"SUCCESS"}}';

					  }else{
						 $result = "FAILURE";
					  }
		  
					 $db = null;
					
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