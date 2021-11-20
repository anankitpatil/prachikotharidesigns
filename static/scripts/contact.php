<?php
$name = $_POST["InputName"];
$number = $_POST["InputNumber"];
$email = $_POST["InputMail"];
$message = $_POST["InputMessage"];
$to = 'anankitpatil@gmail.com, prach25k@gmail.com';
$subject = 'Contact From | prachikotharidesigns.com' . $name;
$message = 'You have received a contact request.<br />
	&nbsp;<br />
	From: <b>' . $name . '</b><br />
	E - mail: <b>' . $email . '</b><br />
	Phone number: <b>' . $number . '</b><br />
	Message: <b>' . $message . '</b><br />
	&nbsp;<br />
	&nbsp;<br />
	Contact form,<br />
	prachikotharidesigns.com';

$headers = 'From: form@prachikotharidesigns.com' . "\r\n" .
  'Reply-To: ' . $email . "\r\n" .
	'Return-Path: anankitpatil@gmail.com' . "\r\n" .
	'MIME-version: 1.0' . "\r\n" .
	'Content-type: text/html; charset= iso-8859-1' . "\r\n" .
	'Organization: Prachi Kothari Designs' . "\r\n" .
	'X-Priority: 3' . "\r\n" .
  'X-Mailer: PHP/' . phpversion();

if(mail($to, $subject, $message, $headers)){
	echo 'We have received your contact details. We will get in touch soon!';
} else{
	echo 'Something went wrong. Please refresh the page and try again.';
};
?>
