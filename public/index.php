<?php

// it will print whole json string, which you access after json_decocde in php
//$myData = json_decode($_POST['nombrescompletos']);
//print_r($myData);
 
$postdata = file_get_contents("php://input");
$request = json_decode($postdata);
$nombres = $request->nombrescompletos;
$razonsocial = $request->razonsocial;
$ruc = $request->ruc;
$telefono = $request->telefono;
$email = $request->email;
$serviciodeinteres = $request->serviciodeinteres;
$codigodecupon = $request->codigodecupon;

$template="La empresa ". $razonsocial . " activó su cupón. Los datos de la activación son los siguientes:" . "<br><br>" .  "- Contacto: " . $nombres . "<br>"  . "- Razón Social: " . $razonsocial . "<br>"  . "- Ruc: " . $ruc . "<br>"  . "- Telefono: " . $telefono . "<br>" . "- Email: " . $email . "<br>" . "- Servicio de interés: " . $serviciodeinteres . "<br>" . "- Cupón activado: " . $codigodecupon . "<br><br>" . "Atte." . "<br>" . "Roger Canchanya - Analista Programador.";

$correo= "lothar.seer@handlom.com";

$subject = "Activación del cupón: " . $codigodecupon;

// Set content-type for sending HTML email
$headers = "MIME-Version: 1.0" . "\r\n";
$headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";

// Additional headers
$headers .= 'From: Handlom - Expotextil<roger.canchanya.syp@handlom.com>' . "\r\n";
$headers .= 'Cc:roger.canchanya.syp@handlom.com' . "\r\n";

// Send email
//Cuando envio $myData como contenido el mensaje no se envía.
if(mail($correo,$subject, $template,$headers)):
	$successMsg = 'El email fue enviado con éxito.';
	//print_r($successMsg);
	header("Location:index.html");
else:
	$errorMsg = 'Ocurrió un problema, por favor intentelo de nuevo.';
endif;
?>