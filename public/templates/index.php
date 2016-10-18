<?php

$correo= $_POST["email"];
$subject = "TEST APP HANDLOM";
// Get HTML contents from file



$htmlContent = file_get_contents("templates/email_template.html");

// Set content-type for sending HTML email
$headers = "MIME-Version: 1.0" . "\r\n";
$headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";

// Additional headers
$headers .= 'From: Handlom - Expotextil<roger.canchanya.syp@handlom.com>' . "\r\n";
$headers .= 'Cc:roger.canchanya.syp@handlom.com' . "\r\n";

// Send email
if(mail("tony2006cg@gmail.com",$subject,$htmlContent,$headers)):
	$successMsg = 'El email fue enviado con éxito.';
	header("Location:form.html");
else:
	$errorMsg = 'Some problem occurred, please try again.';
endif;
?>