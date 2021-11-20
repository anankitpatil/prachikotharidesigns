<?php 
define("UPLOAD_DIR", "/Applications/XAMPP/xamppfiles/htdocs/prachikotharidesigns/uploads/");
if(isset($_REQUEST))
{
	unlink(UPLOAD_DIR . $_POST['image']);
}
?>