/*global todomvc, angular */

/**
 * The main controller for the app. The controller:
 * - retrieves and persists the model via the todoStorage service
 * - exposes the model to the template and provides event handlers
 */
todomvc.controller('DeadlinesCtrl', function DeadlinesCtrl($scope, $location, deadlineService, filterFilter) {
	deadlineService.get(function (data) {
		deadlineService.getModules(function (mods) {
			mods.push({"name": "Add module...", "key": null});
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
					$scope.deadlines = _.sortBy(newValue, function(item) {return item.dueDate;});
				}
			}, true);

			$scope.addClicked = function () {
				$scope.addingDeadline = true;
			};
			$scope.addDeadline = function () {
				if (!$scope.newDModule || !$scope.newDTask || !$scope.newDDue.key) {
					return false;
				}
				var module = $scope.newDModule;
				var name = $scope.newDTask;
				var dueDate = moment($scope.newDDue, "DD/MM/YY HH:mm")._d;
				var due = moment(dueDate).fromNow() + " (" + moment(dueDate).format("DD/MM/YY HH:mm") + ")";

				deadlines.push({
					module: module,
					name: name,
					due: due,
					dueDate: dueDate
				});

				$scope.newDModule = $scope.newDTask = $scope.newDDue = '';
				$scope.addingDeadline = false;
			};
			$scope.moduleChanged = function () {
				if ($scope.newDModule.key === null) {

				}
			};
		});
	});
});
