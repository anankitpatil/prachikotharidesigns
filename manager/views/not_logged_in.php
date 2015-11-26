<?php include('../application/views/meta.php'); ?>
<?php include('../application/views/header.php'); ?>
<div class="container manager">
  <div class="row">
    <div class="col-sm-4"></div>
    <div class="col-sm-4">
      <div class="col-lg-12 text-center">
      <?php if (isset($login)) {
    	if ($login->errors) {
          foreach ($login->errors as $error) {
            echo $error;
          }
        }
        if ($login->messages) {
          foreach ($login->messages as $message) {
            echo $message;
          }
        }
	  }?>
      </div>
      <div class="col-lg-12">
      <form method="post" action="index.php" name="loginform" class="form-horizontal">
        <div class="form-group">
    	  <label for="login_input_username">Username</label>
    	  <input id="login_input_username" class="login_input form-control" type="text" name="user_name" required />
        </div>
        <div class="form-group">
    	  <label for="login_input_password">Password</label>
    	  <input id="login_input_password" class="login_input form-control" type="password" name="user_password" autocomplete="off" required />
        </div>
        <div class="form-group last">
    	  <input type="submit" name="login" value="Log in" class="btn btn-default" style="float: right;" />
          <a href="register.php">Register</a>
        </div>
	  </form>
      </div>
    </div>
    <div class="col-sm-4"></div>
  </div>
</div>
<?php include('../application/views/footer.php'); ?>