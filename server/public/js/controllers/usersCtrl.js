/*global todomvc, angular */

/**
 * The main controller for the app. The controller:
 * - retrieves and persists the model via the todoStorage service
 * - exposes the model to the template and provides event handlers
 */
todomvc.controller('UsersCtrl', function UsersCtrl($scope, $cookies, $rootScope, $location, userService, filterFilter) {
	$scope.login = function () {
		userService.login({email: $scope.email, password: $scope.password}, function (data) {
			$rootScope.user = data.user;
			$cookies.session_key = data.user.session;
			$("#login").foundation('reveal', 'close');
		});
	};

	if ($cookies.session_key) {
		$scope.login();
	}
});
