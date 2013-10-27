/*global todomvc, angular */

/**
 * The main controller for the app. The controller:
 * - retrieves and persists the model via the todoStorage service
 * - exposes the model to the template and provides event handlers
 */
todomvc.controller('ModulesCtrl', function ModulesCtrl($scope, $rootScope, $location, moduleService, filterFilter) {
	moduleService.get(function (data) {
		data.push({"name": "Add module...", "key": null});
		$scope.addingModule = false;
		var modules = $scope.modules = data;

		if ($location.path() === '') {
			$location.path('/');
		}

		$scope.location = $location;

		// $scope.$watch('deadlines', function (newValue, oldValue) {
		// 	if (newValue.length > oldValue.length) {
		// 		deadlineService.post(newValue[newValue.length-1]);
		// 		$scope.deadlines = _.sortBy(newValue, function(item) {return item.dueDate;});
		// 	}
		// }, true);

		$scope.moduleChanged = function () {
			if ($scope.newModule.key === null) {
				$scope.addingModule = true;
			} else {
				$scope.addingModule = false;
			}
		};

		$scope.addModule = function () {
			if ($scope.addingModule) {
				var mod = {name: $scope.newMName, code: $scope.newMCode};
				moduleService.post(mod, function (newMod) {
					$('#addModule').foundation('reveal', 'close');
					$rootScope.$emit('newModule', newMod);
				});
			}
		};
	});
});
