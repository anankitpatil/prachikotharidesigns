<?php
define("UPLOAD_DIR", "/var/www/prachikotharidesigns.com/public_html/uploads/");
if(isset($_REQUEST))
{
	if (isset($_FILES['image']['error']) && $_FILES['image']['error'] == 0)
	{
		if (file_exists(UPLOAD_DIR . $_FILES['image']['name']))
		{
			$name = pathinfo($_FILES['image']['name'], PATHINFO_FILENAME);
			$extension = pathinfo($_FILES['image']['name'], PATHINFO_EXTENSION);
			$increment = '';
			while(file_exists(UPLOAD_DIR . $name . $increment . '.' . $extension)) {
				$increment++;
			}
			$basename = $name . $increment . '.' . $extension;
			move_uploaded_file($_FILES['image']['tmp_name'], UPLOAD_DIR . $basename);
			echo $basename;
		} else {
			move_uploaded_file($_FILES['image']['tmp_name'], UPLOAD_DIR . $_FILES['image']['name']);
			echo $_FILES['image']['name'];
		}
	}
}
?>
