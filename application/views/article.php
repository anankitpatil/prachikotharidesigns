<?php include('meta.php'); ?>
<?php include('header.php'); ?>
<?php foreach($result as $row) { ?>
<div class="container article">
  <div class="row">
    <div class="col-lg-12">
      <figure><img src="../img.php?src=uploads/<?php echo $row->featured; ?>&width=1170&height=750&crop-to-fit" title="Prachi Kothari Designs, Blog: <?php echo $row->title; ?>" /></figure>
    </div>
    <div class="col-lg-12 text-center">
      <h1><?php echo $row->title; ?></h1>
      <h3><?php echo str_replace('-', '.', substr($row ->date, 0, 10)); ?></h3>
      <div class="line"></div>
    </div>
  </div>
  <div class="row article-container">
    <?php echo str_replace("[[]]", "&", $row->content); ?>
  </div>
</div>
<?php } include('footer.php'); ?>