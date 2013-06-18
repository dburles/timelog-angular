angular.module('timelog', [])

	.config(function($routeProvider, $locationProvider) {
		$routeProvider
			.when('/', { controller: 'MainCtrl', templateUrl: 'main.html'})
			.when('/config', { controller: 'ConfigCtrl', templateUrl: 'config.html'})
			.otherwise({ redirectTo: '/' });
		$locationProvider.html5Mode(true);
	})

	.service('timelogService', function($http) {
		// Set some logs for testing
		var logs = [
			{ time: 3.5, task: 'Writing some angular' },
			{ time: 1, task: 'Testing' }
		];
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
			saveGoal: function(newGoal) {
			    if (goal !== newGoal) {
			        goal = newGoal;
			    }
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

			// XXX How do we do things like reset form fields and set focus on a specific field?
			$scope.time = "";
			$scope.task = "";
			$('#time').focus(); // must be an angular way?
		}

		$scope.remove = function(log) {
			// XXX I believe this is broken somehow because of the 'backwards' filter
			$scope.logs.splice(log, 1);
		}

		// XXX Where should this be called to stay up to date? or should getTotal be within the controller???
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

