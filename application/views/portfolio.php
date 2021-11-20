<?php include('meta.php');  ?>
<?php include('header.php'); ?>
<div class="container _portfolio">
  <div class="row">
    <?php
	foreach ($result as $row) {
		$doc = new DOMDocument();
		libxml_use_internal_errors(true);
		$doc->loadHTML($row->images);
		libxml_use_internal_errors(false);
		$images = $doc->getElementsByTagName('img');
		$y = 0;
		foreach ($images as $image) { 
		  if($y == 0) {
		    $y++; ?>
    <div class="col-md-4 col-sm-6 pitems">
      <a href="<?php echo 'portfolio/article/' . strtolower(str_replace(" ", "-", $row->title)); ?>" title="Prachi Kothari Designs, Portfolio: <?php echo str_replace("(())", "'", $row->title) . ' - ' . $row->location; ?>">
        <figure class="smooth"><img src="img.php?src=<?php echo $image->getAttribute('src'); ?>&width=360&height=360&crop-to-fit" title="Prachi Kothari Designs, Portfolio: <?php echo str_replace("(())", "'", $row->title) . ' - ' . $row->location; ?>" /></figure>
        <h1><?php echo str_replace("(())", "'", $row->title); ?></h1>
        <h6><?php echo $row->location; ?></h6>
        <div class="line"></div>
        <p><?php echo substr($row->content, 0, 165) . '...'; ?></p>
        <span class="smooth">View</span>
      </a>
    </div>
    <?php   } ?>
    <?php }
	} ?>
  </div>
</div>
<?php include('footer.php'); ?>