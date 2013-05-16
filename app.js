app = angular.module('timelog', []);

app.config(function($routeProvider) {
	$routeProvider
		.when('/', { controller: 'MainCtrl', templateUrl: 'main.html'})
		.when('/config', { controller: 'MainCtrl', templateUrl: 'config.html'})
		.otherwise({ redirectTo: '/' });
});

app.filter('backwards', function() {
	return function(items) {
		return items.slice().reverse();
	}
});

app.controller('MainCtrl', function($scope) {
	$scope.goal = 6;
	$scope.logs = [];

	$scope.add = function() {
		$scope.logs.push({ time: $scope.time, task: $scope.task });
		$scope.time = "";
		$scope.task = "";
		
	}
	
	var get_total = function() {
		var total = 0;
		_.each($scope.logs, function(log) {
			total += parseFloat(log.time);
		});
		return total;
	};

	$scope.total = get_total();

	$scope.remaining = parseFloat($scope.goal) - $scope.total;

});

