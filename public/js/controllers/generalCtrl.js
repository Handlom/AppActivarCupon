'use strict';
app.controller("generalCtrl", function($scope, $location, $firebaseObject, $firebaseArray, $http){

	var refRegExpoTextil = firebase.database().ref("registrosExpoTextil");

	var registrosExpoTextilCupon = firebase.database().ref("registrosExpoTextilCupon");
	$scope.objBDRegExpoTextil = $firebaseArray(registrosExpoTextilCupon);
	$scope.objPersona={};	
	
	var objtest = [];
	var cupon = [];
	var objMergeTB = {
		nombrescompletos:'',
		razonsocial:'',
		telefono:'',
		email:'',
		serviciodeinteres:'',
		codigodecupon:''
	};

	registrosExpoTextilCupon.once("value")
	  .then(function(snapshot) {
	    snapshot.forEach(function(childSnapshot) {
	      var key = childSnapshot.key;
	      var childData = childSnapshot.val();
	      objtest.push(childSnapshot.val());
	  });
	});

	refRegExpoTextil.once("value")
	  .then(function(snapshot) {
	    snapshot.forEach(function(childSnapshot) {
	      var key = childSnapshot.key;
	      var childData = childSnapshot.val();
	      cupon.push(childSnapshot.val());
	  });
	});

	$scope.agregarCategoria = function(){
		$scope.objBDRegExpoTextil.$add($scope.objPersona);
			$scope.mergeTB($scope.objPersona);
	}

	$scope.valRuc = function(){
		for (var i = 0; i < objtest.length; i++) {		
			if (objtest[i].ruc===$scope.objPersona.ruc) {
				$scope.validacion='Este RUC ya fue registrado.';
				$('#submit-btn').prop('disabled', true).addClass('disabled');
				break;
			}else{
				$scope.validacion='';
				$('#submit-btn').prop('disabled', false).removeClass('enabled');
				continue;
			}	
		}      	      
	}

	$scope.valCupon = function(){
		for (var i = 0; i < cupon.length; i++) {		
			if (cupon[i].codicupon===$scope.objPersona.cupon) {
				$scope.validacioncupon='';
				$('#submit-btn').prop('disabled', false).removeClass('enabled');	
				for (var i = 0; i < objtest.length; i++) {
					if (objtest[i].cupon===$scope.objPersona.cupon) {
						$scope.validacioncupon='Este cupón ya fue registrado.';
						console.log('deshabilitando...');
						$('#submit-btn').prop('disabled', true).addClass('disabled');
					}else{
						$scope.validacioncupon='';
						$('#submit-btn').prop('disabled', false).removeClass('enabled');	
						continue;}
				}
				continue;
			}else{
				$scope.validacioncupon='Cupón invalido.';
				$('#submit-btn').prop('disabled', true).addClass('disabled');
				break;
			}	
		}      	      
	}

	$scope.mergeTB = function(tb){
		for (var i = 0; i < cupon.length; i++) {		
			if (cupon[i].codicupon===tb.cupon) {
				objMergeTB = {
				nombrescompletos:tb.contacto,
				razonsocial:tb.compania,
				ruc:tb.ruc,
				telefono:cupon[i].telefono,
				email:cupon[i].email,
				serviciodeinteres:cupon[i].servicio,
				codigodecupon: cupon[i].codicupon
				};
                $http({
                        method : 'POST',
                        url : 'index.php',
                        data: {
                        	nombrescompletos: objMergeTB.nombrescompletos,
                        	razonsocial: objMergeTB.razonsocial,
                        	ruc: objMergeTB.ruc,
                        	telefono: objMergeTB.telefono,
                        	email: objMergeTB.email,
                        	serviciodeinteres: objMergeTB.serviciodeinteres,
                        	codigodecupon: objMergeTB.codigodecupon
                        	},
                        headers : {'Content-Type': 'application/x-www-form-urlencoded'}  

                }).success(function(res){
                        console.log(res);
                }).error(function(error){
                        console.log(error);
        		});
        		$scope.objPersona={};
	            setTimeout(function(){ 
					window.location.href="#index.html";
				}, 3000);	                
				break;
			}else{
				$scope.validacion='';
				$('#submit-btn').prop('disabled', false).removeClass('enabled');
				continue;
			}	
		}      	      
	}
});