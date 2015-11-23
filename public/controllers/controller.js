function AppCtrl($scope, $http) {
	console.log("Hello world from controller")

var refresh = function(){
	$http.get('/nodelist').success(function(response){
		console.log("I got the data I requested");
		$scope.nodelist = response;
		$scope.node = "";
	});

};

refresh();

$scope.addNode = function () {
	console.log($scope.node);
	$http.post('/nodelist', $scope.node).success(function (response){
		console.log(response);
		refresh();
	});
};

$scope.remove = function(id) {
	console.log(id);
	$http.delete('/nodelist/' + id).success(function (response){
		refresh();

	});
};

$scope.edit = function(id) {
	console.log(id);
	$http.get('/nodelist/' + id).success(function (response){
		$scope.node = response;

	});

};

$scope.update = function() {
	console.log($scope.node._id);
	$http.put('/nodelist/' + $scope.node._id, $scope.node).success(function(response){
		refresh();

	});

};

$scope.deselect = function() {
	$scope.node = "";

};


}