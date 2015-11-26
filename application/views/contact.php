<?php include('meta.php'); ?>
<?php include('header.php'); ?>
<div class="container contact">
  <div class="row">
    <div class="col-md-3"></div>
    <div class="col-md-6 box">
      <div class="col-sm-12">
        <h2>Prachi Kothari Designs</h2>
      </div>
      <div class="col-sm-6">
        <h3>Email: <a href="mailto:prach25k@gmail.com" title="Prachi Kothari Designs, Email">prach25k@gmail.com</a></h3>
      </div>
      <div class="col-sm-6">
        <h3>Phone: <a href="tel:+919820890200" title="Prachi Kothari Designs, Phone Number">+91 9820890200</a></h3>
      </div>
      <div class="col-sm-12">
        <h3 class="contact-title">Contact Form:</h3>
        <form id="contact" class="form-horizontal" data-toggle="validator" role="form">
          <div class="form-group">
            <label class="control-label" for="InputName">Name</label>
            <input id="InputName" name="InputName" type="text" placeholder="Your name" class="form-control">
            <div class="help-block with-errors">Enter a valid name</div>
          </div>
          <div class="form-group">
            <label class="control-label" for="InputMail">Email</label>
            <input id="InputMail" name="InputMail" type="text" placeholder="Your email id" class="form-control">
            <div class="help-block with-errors">Enter a valid e-mail</div>
          </div>
          <div class="form-group">
            <label class="control-label" for="InputNumber">Phone number</label>
            <input id="InputNumber" name="InputNumber" type="text" placeholder="Your phone no." class="form-control">
            <div class="help-block with-errors">Enter a valid number</div>
          </div>
          <div class="form-group">
            <label class="control-label" for="textarea">Message</label>
            <textarea id="InputMessage" name="InputMessage" placeholder="Leave a message..." class="form-control"></textarea>
            <div class="help-block with-errors">Enter a valid message</div>
          </div>
          <div class="form-actions text-center">
            <input type="hidden" name="save" value="contact">
            <button class="btn smooth" type="button" id="submit" name="submit">Send</button>
          </div>
        </form>
      </div>
    </div>
    <div class="col-md-3"></div>
  </div>
</div>
<div class="container-fluid">
<div class="row instafeed" id="instafeed">
  <div class="instatitle"><i class="fa fa-instagram"></i> </div>
</div>
<?php include('footer.php'); ?>