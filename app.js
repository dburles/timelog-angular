angular.module('timelog', [])
	.config(function($routeProvider) {
		$routeProvider
			.when('/', { controller: 'MainCtrl', templateUrl: 'main.html'})
			.when('/config', { controller: 'MainCtrl', templateUrl: 'config.html'})
			.otherwise({ redirectTo: '/' });
	})
	.service('timelogService', function() {
		var logs = [];
		var goal = 6;

		return {
			logs: function() {
				return logs;
			},
			add: function(data) {
				logs.push(data);
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
			saveGoal: function(goal) {
				goal = goal;
				console.log(goal);
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
		$scope.save = function() {
			timelogService.saveGoal($scope.goal);
			alert("Saved.");
		}

		$scope.total = timelogService.getTotal();
		$scope.remaining = parseFloat($scope.goal) - $scope.total;
	}]);

