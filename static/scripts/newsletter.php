<?php
$email = $_POST[ "subscriptionMail" ];
$to = 'anankitpatil@gmail.com, prach25k@gmail.com';
$subject = 'Newsletter Subscription Form | prachikotharidesigns.com';
$message = 'Please add this email to your subscribers list.<br />
	&nbsp;<br />
	<b>' . $email . '</b><br />
	&nbsp;<br />
	&nbsp;<br />
	Newsletter form,<br />
	prachikotharidesigns.com';
$headers = 'From: form@prachikotharidesigns.com' . "\r\n" .
  'Reply-To: ' . $email . "\r\n" .
	'Return-Path: info@prachikotharidesigns.com' . "\r\n" .
	'MIME-version: 1.0' . "\r\n" .
	'Content-type: text/html; charset= iso-8859-1' . "\r\n" .
	'Organization: Prachi Kothari Designs' . "\r\n" .
	'X-Priority: 3' . "\r\n" .
  'X-Mailer: PHP/' . phpversion();

if ( mail( $to, $subject, $message, $headers ) ) {
	echo 'We have received your contact details. We will get in touch soon!';
} else {
	echo 'Something went wrong. Please refresh the page and try again.';
};
?>
