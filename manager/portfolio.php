<?php
// checking for minimum PHP version
if (version_compare(PHP_VERSION, '5.3.7', '<')) {
    exit("Sorry, Simple PHP Login does not run on a PHP version smaller than 5.3.7 !");
} elseif (version_compare(PHP_VERSION, '5.5.0', '<')) {
    require_once("libraries/password_compatibility_library.php");
}

// include the configs / constants for the database connection
require_once("config/db.php");

// load the login class
require_once("classes/Login.php");

$login = new Login();

if ($login->isUserLoggedIn() == true) {
    include('../application/views/meta.php');
    include('../application/views/header.php'); ?>

    <div class="container manager">
      <div class="menu">
        <a href="<?php echo BASE_URL; ?>manager">Blog</a>
        <a href="portfolio.php" class="active">Portfolio</a>
        <a href="index.php?logout" class="logout"><span>(<?php echo $_SESSION['user_email']; ?>) </span>Logout</a>
      </div>
    </div>
    <div class="container portfolio">
      <div class="row">
      <?php $connection = mysqli_connect(DB_HOST, DB_USER, DB_PASS, DB_NAME);
    $data = mysqli_query($connection, "SELECT * FROM portfolio ORDER BY date DESC") or die(mysqli_error($connection));
    while ($item = mysqli_fetch_array($data)) { ?>
        <div class="col-lg-4 item">
          <figure><?php $doc = new DOMDocument();
            libxml_use_internal_errors(true);
            $doc->loadHTML($item['images']);
            libxml_use_internal_errors(false);
            echo '<img src="../img.php?src=' . $doc->getElementsByTagName('img')->item(0)->getAttribute('src') . '&width=360&height=360&crop-to-fit" />'; ?></figure>
          <h2><?php echo str_replace("(())", "'", $item['title']); ?></h2>
          <i class="fa fa-edit" id="<?php echo $item['id']; ?>"></i>
          <i class="fa fa-remove" id="<?php echo $item['id']; ?>"></i>
        </div>
        <?php } ?>
        <div class="col-lg-4">
          <div class="add">
          	<i class="fa fa-plus"></i>
          </div>
        </div>
      </div>
    </div>

<?php
} else {
                include("views/not_logged_in.php");
            }

include('../application/views/footer.php'); ?>
