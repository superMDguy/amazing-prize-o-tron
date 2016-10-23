(function () {
  'use strict';

  // Showing Requests controller
  angular
    .module('showing-requests')
    .controller('ShowingRequestsController', ShowingRequestsController);

  ShowingRequestsController.$inject = ['$scope', '$state', '$uibModal','$window', 'Authentication', 'showingRequestResolve'];

  function ShowingRequestsController ($scope, $state, $uibModal,$window, Authentication, showingRequest) {
    var vm = this;

    vm.addPet = addPet;
    vm.authentication = Authentication;
    vm.error = null;
    vm.form = {};
    vm.remove = remove;
    vm.save = save;
    vm.showingRequest = showingRequest;
    vm.showingRequest.pets = showingRequest.pets || [];
    vm.toggleCurrentAddressMoveInDropDown = toggleCurrentAddressMoveInDropDown;
    vm.toggleMoveInDropDown = toggleMoveInDropDown;

    function addPet() {

      var modalInstance = $uibModal.open({
        templateUrl: '/modules/showing-requests/client/create-edit/add-pet.client.view.html',
        controller: 'AddPetController',
        controllerAs: 'vm'
      });

      modalInstance.result.then(function (newTenant) {
        vm.showingRequest.pets.push(newTenant);
      });
    }

    // Remove existing Showing Request
    function remove () {
      if ($window.confirm('Are you sure you want to delete?')) {
        vm.showingRequest.$remove($state.go('showing-requests.list'));
      }
    }

    // Save Showing Request
    function save (isValid) {
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

      function successCallback (res) {
        $state.go('showing-requests.view', {
          showingRequestId: res._id
        });
      }

      function errorCallback (res) {
        vm.error = res.data.message;
      }
    }

    function toggleMoveInDropDown () {
      vm.form.moveInDropdown.IsOpen = !vm.form.moveInDropdown.IsOpen;
    }
    function toggleCurrentAddressMoveInDropDown () {
      vm.form.currentAddressMoveInDropDown.IsOpen = !vm.form.currentAddressMoveInDropDown.IsOpen;
    }
  }
}());
