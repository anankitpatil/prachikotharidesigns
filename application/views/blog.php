<?php include('meta.php'); ?>
<?php include('header.php'); ?>
<div class="container blog">
  <div class="row">
	<?php 
	$i = 1; 
	foreach ($result as $row) {
		$doc = new DOMDocument();
		libxml_use_internal_errors(true);
		$doc->loadHTML($row->content);
		libxml_use_internal_errors(false);
		$content = substr($doc->getElementsByTagName('p')->item(0)->nodeValue, 0, 165) . '...';
		/*if($i === 0) {
			echo '<div class="row"><div class="col-lg-12 featured"><figure><img src="img.php?src=uploads/' . $row->featured . '&width=1170&height=750&crop-to-fit" /></figure><div class="col-lg-12 text-center"><h1>' . $row->title . '</h1><h3>' . str_replace('-', '/', substr($row ->date, 0, 10)) . '</h3><div class="line"></div><p>' . $content . '</p><a class="smooth" href="blog/article/' . strtolower(str_replace(" ", "-", $row->title)) . '" title="Prachi Kothari Designs, Blog: ' . $row->title .'">Read article</a></div></div></div>';
			$i++;*/ 
			
			 // if ($i % 3 == 0) echo '<div class="row">';
			 
		//} else { ?>
                  <div class="col-lg-4 col-sm-6 text-center bitem">
                    <figure><img src="img.php?src=uploads/<?php echo $row->featured; ?>&width=730&height=450&crop-to-fit" title="Prachi Kothari Designs, Blog: <?php echo $row->title; ?>" /></figure>
                    <h1><?php echo $row->title; ?></h1>
                    <h3><?php echo str_replace('-', '.', substr($row ->date, 0, 10)); ?></h3>
                    <div class="line"></div>
                    <p><?php echo $content; ?></p>
                    <a class="smooth" href="blog/article/<?php echo strtolower(str_replace(" ", "-", $row->title)); ?>" title="Prachi Kothari Designs, Blog: <?php echo $row->title; ?>">Read more</a>
                  </div>
              
		<?php //}
		//if ($i % 3 == 0) echo '</div>'; $i++;
	} ?>
  </div>
</div><?php include('footer.php'); ?>