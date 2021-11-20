<?php include('../application/views/meta.php'); ?>
<?php include('../application/views/header.php'); ?>
<div class="container manager">
  <div class="menu">
    <a href="<?php echo BASE_URL; ?>manager" class="active">Blog</a>
    <a href="portfolio.php">Portfolio</a>
    <a href="index.php?logout" class="logout"><span>(<?php echo $_SESSION['user_email']; ?>) </span>Logout</a>
  </div>
  <div class="row">
    <div class="col-lg-12">
      <ul class="media-list">
	  	<?php $connection = mysqli_connect(DB_HOST, DB_USER, DB_PASS, DB_NAME);
          $data = mysqli_query($connection, "SELECT * FROM blog ORDER BY date DESC") or die(mysqli_error($connection));
          while ($article = mysqli_fetch_array($data)) { ?>
      	  <li class="media">
    	    <div class="media-left">
      	  	  <a href="#">
                <?php $doc = new DOMDocument();
                libxml_use_internal_errors(true);
                $doc->loadHTML($article['content']);
                libxml_use_internal_errors(false);
                // img = $doc->getElementsByTagName('img')->item(0);
                echo '<img class="media-object" src="../img.php?src=uploads/' . $article['featured'] .'&width=240&height=180&crop-to-fit" alt="' . $article['title'] . '">'; ?>
      	  	  </a>
            </div>
            <div class="media-body">
              <h2 class="media-heading"><?php echo $article['title']; ?><i class="fa fa-pencil" id="<?php echo $article['id']; ?>"></i><i class="fa fa-remove" id="<?php echo $article['id']; ?>"></i></h2>
              <?php  $p = $doc->getElementsByTagName('p')->item(0);
                echo '<p>' . substr($p->nodeValue, 0, 360) . '...</p>'; ?>
            </div>
          </li>
      	<?php } ?>
      </ul>
    </div>
    <div class="col-lg-12 text-center">
      <h1><i class="fa fa-plus"></i></h1>
    </div>
  </div>
</div>
<?php include('../application/views/footer.php'); ?>
