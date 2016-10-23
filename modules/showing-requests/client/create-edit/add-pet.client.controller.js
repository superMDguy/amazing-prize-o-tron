(function () {
  angular.module('showing-requests')
    .controller('AddPetController', AddPetController);

  AddPetController.$inject = ['$scope', '$uibModalInstance'];

  function AddPetController($scope, $uibModalInstance) {

    var vm = this;
    vm.cancel = cancel;
    vm.ok = ok;
    vm.user = {};

    function ok(isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.addPetForm');
        return false;
      }

      $uibModalInstance.close(vm.pet);
    }

    function cancel() {
      $uibModalInstance.dismiss('cancel');
    }
  }
}());
