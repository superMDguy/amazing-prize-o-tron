(function () {
  'use strict';

  // Showing requests controller
  angular
    .module('showing-requests')
    .controller('ShowingRequestsController', ShowingRequestsController);

  ShowingRequestsController.$inject = ['$scope', '$state', '$window', 'Authentication', 'showingRequestResolve'];

  function ShowingRequestsController ($scope, $state, $window, Authentication, showingRequest) {
    var vm = this;

    vm.authentication = Authentication;
    vm.showingRequest = showingRequest;
    vm.error = null;
    vm.form = {};
    vm.remove = remove;
    vm.save = save;

    // Remove existing Showing request
    function remove() {
      if ($window.confirm('Are you sure you want to delete?')) {
        vm.showingRequest.$remove($state.go('showing-requests.list'));
      }
    }

    // Save Showing request
    function save(isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.showingRequestForm');
        return false;
      }

      // TODO: move create/update logic to service
      if (vm.showingRequest._id) {
        vm.showingRequest.$update(successCallback, errorCallback);
      } else {
        vm.showingRequest.$save(successCallback, errorCallback);
      }

      function successCallback(res) {
        $state.go('showing-requests.view', {
          showingRequestId: res._id
        });
      }

      function errorCallback(res) {
        vm.error = res.data.message;
      }
    }
  }
}());
