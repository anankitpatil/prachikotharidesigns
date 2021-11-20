<?php 
if (get_magic_quotes_gpc()) {
    $process = array(&$_GET, &$_POST, &$_COOKIE, &$_REQUEST);
    while (list($key, $val) = each($process)) {
        foreach ($val as $k => $v) {
            unset($process[$key][$k]);
            if (is_array($v)) {
                $process[$key][stripslashes($k)] = $v;
                $process[] = &$process[$key][stripslashes($k)];
            } else {
                $process[$key][stripslashes($k)] = stripslashes($v);
            }
        }
    }
    unset($process);
}

if(isset($_REQUEST))
{
	include("config/db.php");
	$connection = mysql_connect(DB_HOST, DB_USER, DB_PASS);
	mysql_select_db(DB_NAME, $connection);
	error_reporting(E_ALL && ~E_NOTICE);
	
	$title = $_POST['title'];
	$location = $_POST['location'];
	$tag = $_POST['tag'];
	$service = $_POST['service'];
	$content = mysql_real_escape_string($_POST['content']);
	$images_ = str_replace("[[]]", "&", $_POST['images']);
	$images = mysql_real_escape_string($images_);
	
	if(isset($_POST['id'])) {
		$id = $_POST['id'];
		$sql = "UPDATE portfolio SET title = '$title', location = '$location', content = '$content', images = '$images', tag = '$tag', service = '$service' WHERE id = '$id'";
		$result = mysql_query($sql);
		if($result){
			echo "Saved.";
		}
	} else {
		$sql = "INSERT INTO portfolio (title, location, content, images, tag, service) VALUES ('$title', '$location', '$content', '$images', '$tag', '$service')";
		$result = mysql_query($sql);
		if($result){
			echo mysql_insert_id();
		}	
	}
}
?>