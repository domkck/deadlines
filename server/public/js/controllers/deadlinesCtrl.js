/*global todomvc, angular */

/**
 * The main controller for the app. The controller:
 * - retrieves and persists the model via the todoStorage service
 * - exposes the model to the template and provides event handlers
 */
todomvc.controller('DeadlinesCtrl', function DeadlinesCtrl($scope, $location, deadlineService, filterFilter) {
	deadlineService.get(function (data) {
		deadlineService.getModules(function (mods) {
			$scope.addingDeadline = false;
			var deadlines = $scope.deadlines = data;
			var modules = $scope.modules = mods;

			if ($location.path() === '') {
				$location.path('/');
			}

			$scope.location = $location;

			$scope.$watch('deadlines', function (newValue, oldValue) {
				if (newValue.length > oldValue.length) {
					deadlineService.post(newValue[newValue.length-1]);
				}
			}, true);

			$scope.addClicked = function () {
				$scope.addingDeadline = true;
			};

			$scope.addDeadline = function () {
				var module = $scope.newDModule;
				var name = $scope.newDTask;
				var due = $scope.newDDue;

				deadlines.push({
					module: module,
					name: name,
					due: due
				});

				$scope.newDModule = $scope.newDTask = $scope.newDDue = '';
				$scope.addingDeadline = false;
			};
		});
	});
});
