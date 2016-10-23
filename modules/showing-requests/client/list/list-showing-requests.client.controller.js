(function () {
  'use strict';

  angular
    .module('showing-requests')
    .controller('ShowingRequestsListController', ShowingRequestsListController);

  ShowingRequestsListController.$inject = ['ShowingRequestsService'];

  function ShowingRequestsListController(ShowingRequestsService) {
    var vm = this;

    vm.showingRequests = ShowingRequestsService.query();
  }
}());
