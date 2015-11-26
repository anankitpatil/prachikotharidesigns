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
	
	$title = str_replace("(())", "'", $_POST['title']);
	$content_ = str_replace("[[]]", "&", $_POST['content']);
	$content = mysql_real_escape_string($content_);
	$featured = $_POST['featured'];
	
	if(isset($_POST['id'])) {
		$id = $_POST['id'];
		$sql = "UPDATE blog SET title = '$title', content = '$content', featured = '$featured' WHERE id = '$id'";
		$result = mysql_query($sql);
		if($result){
			echo "Saved.";
		}
	} else {
		$sql = "INSERT INTO blog (title, content, featured) VALUES ('$title', '$content', '$featured')";
		$result = mysql_query($sql);
		if($result){
			echo mysql_insert_id();
		}	
	}
}
?>