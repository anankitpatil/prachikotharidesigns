<?php include('../application/views/meta.php'); ?>
<?php include('../application/views/header.php'); ?>
<div class="container manager">
  <div class="row">
    <div class="col-sm-4"></div>
    <div class="col-sm-4">
      <div class="col-lg-12 _logo">
        <figure>
          <object type="image/svg+xml" data="<?php echo BASE_URL; ?>static/images/logo_b.svg">
            <img src="<?php echo BASE_URL; ?>static/images/logo_b.svg" />
          </object>
        </figure>
      </div>
      <div class="col-lg-12 text-center">
      <?php if (isset($registration)) {
    	if ($registration->errors) {
          foreach ($registration->errors as $error) {
            echo $error;
          }
    	}
    	if ($registration->messages) {
          foreach ($registration->messages as $message) {
            echo $message;
          }
    	}
	  }?>
      </div>
      <div class="col-lg-12">
      <form method="post" action="register.php" name="registerform" class="form-horizontal">
        <div class="form-group">
          <label for="login_input_username">Username (only letters and numbers, 2 to 64 characters)</label>
    	  <input id="login_input_username" class="login_input form-control" type="text" pattern="[a-zA-Z0-9]{2,64}" name="user_name" required />
        </div>
        <div class="form-group">
          <label for="login_input_email">User's email</label>
    <input id="login_input_email" class="login_input form-control" type="email" name="user_email" required />
        </div>
        <div class="form-group">
    	  <label for="login_input_password_new">Password (min. 6 characters)</label>
    	  <input id="login_input_password_new" class="login_input form-control" type="password" name="user_password_new" pattern=".{6,}" required autocomplete="off" />
        </div>
        <div class="form-group">
          <label for="login_input_password_repeat">Repeat password</label>
    	  <input id="login_input_password_repeat" class="login_input form-control" type="password" name="user_password_repeat" pattern=".{6,}" required autocomplete="off" />
        </div>
        <div class="form-group last">
    	  <input type="submit"  name="register" value="Register" class="btn btn-default" style="float: right;" />
          <a href="index.php">Back</a>
        </div>
	  </form>
      </div>
    </div>
    <div class="col-sm-4"></div>
  </div>
</div>
<?php include('../application/views/footer.php'); ?>
