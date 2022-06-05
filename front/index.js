angular.module('endpointsApp', [])

function mainController($scope, $http) {
	$scope.newReceta = {};
	$scope.recetas = {};
	
	$scope.selected = false;

	// Obtenemos todos los datos de la base de datos
	$http.get('/api/recetas').success(function(data) {
		$scope.recetas = data;
	}) 
	.error(function(data) {
		console.log('Error: ' + data);
	});
	

	// Función para registrar a una receta
	$scope.registrarReceta = function() {
		$http.post('/api/recetas/', $scope.newReceta)
		.success(function(data) {
            $scope.newReceta = {}; // Borramos los datos del formulario una vez que registramos a la persona.
            $scope.recetas = data;
			})
		.error(function(data) {
			console.log('Error: ' + data);
		});
	};
	
	// Función para editar los datos de una persona
	$scope.modificarReceta = function(newReceta) {
		$http.put('/api/recetas/' + $scope.newReceta._id, $scope.newReceta)
		.success(function(data) {
            $scope.newReceta = {}; // Borramos los datos del formulario una vez que registramos a la persona.
            $scope.recetas = data;
			$scope.selected = false;
		})
		.error(function(data) {
			console.log('Error: ' + data);
		});
	};

	// Función que borra un objeto persona conocido su id
	$scope.borrarReceta = function(newReceta) {
		$http.delete('/api/recetas/' + $scope.newReceta._id)
		.success(function(data) {
			$scope.newReceta = {};
			$scope.recetas = data;
			$scope.selected = false;
		})
		.error(function(data) {
			console.log('Error: ' + data);
		});
	};
	
	// Función para tomar el objeto seleccionado en la tabla (Receta)
	$scope.seleccionarReceta = function(receta) {
		$scope.newReceta = receta;
		$scope.selected = true;
	};
	
}