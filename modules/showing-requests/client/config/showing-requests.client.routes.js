(function () {
  'use strict';

  angular
    .module('showing-requests')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('showing-requests', {
        abstract: true,
        url: '/showing-requests',
        template: '<ui-view/>'
      })
      .state('showing-requests.list', {
        url: '',
        templateUrl: '/modules/showing-requests/client/list/list-showing-requests.client.view.html',
        controller: 'ShowingRequestsListController',
        controllerAs: 'vm',
        data: {
          roles: ['user', 'admin'],
          pageTitle: 'Showing Requests List'
        }
      })
      .state('showing-requests.create', {
        url: '/create',
        templateUrl: '/modules/showing-requests/client/create-edit/form-showing-request.client.view.html',
        controller: 'ShowingRequestsController',
        controllerAs: 'vm',
        resolve: {
          showingRequestResolve: newShowingRequest
        },
        data: {
          pageTitle: 'Showing Requests Create'
        }
      })
      .state('showing-requests.edit', {
        url: '/:showingRequestId/edit',
        templateUrl: '/modules/showing-requests/client/create-edit/form-showing-request.client.view.html',
        controller: 'ShowingRequestsController',
        controllerAs: 'vm',
        resolve: {
          showingRequestResolve: getShowingRequest
        },
        data: {
          roles: ['user', 'admin'],
          pageTitle: 'Edit Showing Request {{ showingRequestResolve.name }}'
        }
      })
      .state('showing-requests.view', {
        url: '/:showingRequestId',
        templateUrl: '/modules/showing-requests/client/view/view-showing-request.client.view.html',
        controller: 'ShowingRequestsController',
        controllerAs: 'vm',
        resolve: {
          showingRequestResolve: getShowingRequest
        },
        data: {
          roles: ['user', 'admin'],
          pageTitle: 'Showing Request {{ showingRequestResolve.name }}'
        }
      });
  }

  getShowingRequest.$inject = ['$stateParams', 'ShowingRequestsService'];

  function getShowingRequest($stateParams, ShowingRequestsService) {
    return ShowingRequestsService.get({
      showingRequestId: $stateParams.showingRequestId
    }).$promise;
  }

  newShowingRequest.$inject = ['ShowingRequestsService'];

  function newShowingRequest(ShowingRequestsService) {
    return new ShowingRequestsService();
  }
}());
