angular.module('timelog', [])
	.config(function($routeProvider, $locationProvider) {
		$routeProvider
			.when('/', { controller: 'MainCtrl', templateUrl: 'main.html'})
			.when('/config', { controller: 'ConfigCtrl', templateUrl: 'config.html'})
			.otherwise({ redirectTo: '/' });
		$locationProvider.html5Mode(true);
	})
	.service('timelogService', function($http) {
		var logs = [];
		var goal = 6;

		return {
			logs: function() {
				return logs;
			},
			add: function(data) {
				logs.push(data);
				/*
				$http.post('/api/log/add', data)
					.success(function(data, status, headers, config) {
						console.log(data);
					})
					.error(function(data, status, headers, config) {
						//alert("Error: " + status);
					});
				*/
			},
			getTotal: function() {
				var total = 0;
				_.each(logs, function(log) {
					total += parseFloat(log.time);
				});
				return total;
			},
			goal: function() {
				return goal;
			},
			saveGoal: function(data) {
				goal = data;
			}
		}
	})
	.filter('backwards', function() {
		return function(items) {
			return items.slice().reverse();
		}
	})
	.controller('MainCtrl', ['$scope', 'timelogService', function($scope, timelogService) {
		$scope.goal = timelogService.goal();
		$scope.logs = timelogService.logs();

		$scope.add = function() {
			timelogService.add({ time: $scope.time, task: $scope.task });
			$scope.time = "";
			$scope.task = "";
			$('#time').focus(); // must be an angular way?
		}

		$scope.total = timelogService.getTotal();
		$scope.remaining = parseFloat($scope.goal) - $scope.total;
	}])
	.controller('ConfigCtrl', ['$scope', 'timelogService', function($scope, timelogService) {
		$scope.goal = timelogService.goal();

		$scope.save = function() {
			timelogService.saveGoal($scope.goal);
			//alert("Saved.");
		}
	}]);

