<?php
$email = $_POST["subscriptionMail"];
$to = 'prach25k@gmail.com';
$subject = 'prachikotharidesigns.com | Subscription Form' . $name;
$message = 'E - mail: ' . $email . "\r\n" . 
	'Please add this email to your subscribers list.' . "\r\n" . 
	'prachikotharidesigns.com';
	$headers = 'From: subscription-form@prachikotharidesigns.com' . "\r\n" .
    'Reply-To: ' . $email . "\r\n" .
    'X-Mailer: PHP/' . phpversion();
	
if(mail($to, $subject, $message, $headers)){
	echo 'We have received your contact details. We will get in touch soon!';	
} else{
	echo 'Something went wrong. Please refresh the page and try again.';	
};
?> 