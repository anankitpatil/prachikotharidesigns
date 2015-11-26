<?php include('meta.php'); ?>
<?php include('header.php'); ?>
<div class="container project">
  <div class="row">
    <div class="col-lg-12 project-slide">
      <div class="holder">
      <?php $doc = new DOMDocument();
		libxml_use_internal_errors(true);
		$doc->loadHTML($result[0]->images);
		libxml_use_internal_errors(false);
		$images = $doc->getElementsByTagName('img');
		foreach ($images as $image) { ?>
      <figure><img src="../../img.php?src=<?php echo $image->getAttribute('src'); ?>&width=1170&height=750&crop-to-fit" title="Prachi Kothari Designs, Portfolio: <?php echo str_replace("(())", "'", $result[0]->title) . ' - ' . $result[0]->location; ?>" /></figure>
      <?php } ?>
      </div>
      <i class="fa fa-chevron-left smooth"></i><i class="fa fa-chevron-right smooth"></i>
    </div>
    <div class="col-lg-12 project-content text-center">
      <h1><?php echo str_replace("(())", "'", $result[0]->title); ?></h1>
      <h4><?php echo $result[0]->location; ?></h4>
      <div class="line"></div>
      <p><?php echo nl2br($result[0]->content); ?></p>
      <a href="<?php echo BASE_URL; ?>portfolio" class="smooth" title="Prachi Kothari Designs, Portfolio">Back</a>
    </div>
</div>
<?php include('footer.php'); ?>