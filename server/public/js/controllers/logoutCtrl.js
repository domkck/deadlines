/*global todomvc, angular */

/**
 * The main controller for the app. The controller:
 * - retrieves and persists the model via the todoStorage service
 * - exposes the model to the template and provides event handlers
 */
todomvc.controller('LogoutCtrl', function LogoutCtrl($scope, $cookies, $rootScope, $location, userService, filterFilter) {
	$scope.logout = function () {
		$rootScope.user = null;
		delete $cookies['session_key'];
		$rootScope.$emit('refresh');
	};
});
