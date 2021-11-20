<?php
if(isset($_GET['id'])) {
	include("config/db.php");
	$connection = mysql_connect(DB_HOST, DB_USER, DB_PASS);
	mysql_select_db(DB_NAME, $connection);
	
	$id = $_GET['id'];
		
	$data = mysql_query("SELECT id, title, location, content, images, tag, service FROM portfolio WHERE id = '$id'") or die(mysql_error());
	$row = mysql_fetch_row($data);
	
	$data = array('id' => $row[0], 'title' => str_replace("(())", "'", $row[1]), 'location' => $row[2], 'content' => $row[3], 'images' => str_replace("[[]]", "&", $row[4]), 'tag' => $row[5], 'service' => $row[6]);
	print json_encode($data);
}
?>