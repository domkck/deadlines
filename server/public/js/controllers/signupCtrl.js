/*global todomvc, angular */

/**
 * The main controller for the app. The controller:
 * - retrieves and persists the model via the todoStorage service
 * - exposes the model to the template and provides event handlers
 */
todomvc.controller('SignupCtrl', function SignupCtrl($scope, $cookies, $rootScope, $location, userService, filterFilter) {
	$scope.signup = function () {
		userService.post({email: $scope.email, password: $scope.password, name: $scope.name, number: $scope.number}, function (data) {
			$rootScope.user = data;
			$cookies.session_key = data.session;
			$("#signup").foundation('reveal', 'close');
		});
	};
});
