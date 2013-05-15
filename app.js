app = angular.module('timelog', []);

app.config(function($routeProvider) {
	$routeProvider
		.when('/', { controller: MainCtrl, templateUrl: 'main'})
		.when('/config', { controller: ConfigCtrl, templateUrl: 'config'})
		.otherwise({ redirectTo: '/' });
});