<?php
$name = $_POST["InputName"];
$number = $_POST["InputNumber"];
$email = $_POST["InputMail"];
$message = $_POST["InputMessage"];
$to = 'anankitpatil@gmail.com';
$subject = 'prachikotharidesigns.com Contact Form | ' . $name;
$message = 'From: ' . $name . "\r\n" .
	'E - mail: ' . $email . "\r\n" . 
	'Phone number: ' . $number . "\r\n" .
	'Message: ' . $message . "\r\n";
	$headers = 'From: contact-form@prachikotharidesigns.com' . "\r\n" .
    'Reply-To: ' . $email . "\r\n" .
    'X-Mailer: PHP/' . phpversion();
	
if(mail($to, $subject, $message, $headers)){
	echo 'We have received your contact details. We will get in touch soon!';	
} else{
	echo 'Something went wrong. Please refresh the page and try again.';	
};
?> 