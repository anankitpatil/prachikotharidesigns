<?php 
if(isset($_POST['id']))
{
	include("config/db.php");
	$connection = mysql_connect(DB_HOST, DB_USER, DB_PASS);
	mysql_select_db(DB_NAME, $connection);
	error_reporting(E_ALL && ~E_NOTICE);
	
	$id = $_POST['id'];
	$query = "DELETE FROM portfolio WHERE id=$id";
	$getquery = "SELECT * FROM portfolio WHERE id=$id LIMIT 1";
	$temp = mysql_query($getquery);
	while($blog = mysql_fetch_array($temp)) { 
		$doc = new DOMDocument();
		libxml_use_internal_errors(true);
		$doc->loadHTML($temp['images']);
		libxml_use_internal_errors(false);
		
		$imgs = $doc->getElementsByTagName('img');
		foreach($imgs as $img) {
			unlink(UPLOAD_DIR . basename($img->getAttribute('src')));
		}
	}
	$result = mysql_query($query);
	if($result){
		echo 'Deleted.';
	}	
}
?>