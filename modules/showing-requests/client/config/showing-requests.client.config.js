(function () {
  'use strict';

  angular
    .module('showing-requests')
    .run(menuConfig);

  menuConfig.$inject = ['menuService'];

  function menuConfig(menuService) {
    // Set top bar menu items
    menuService.addMenuItem('topbar', {
      title: 'Showing requests',
      state: 'showing-requests',
      type: 'dropdown',
      roles: ['*']
    });

    // Add the dropdown list item
    menuService.addSubMenuItem('topbar', 'showing-requests', {
      title: 'List Showing requests',
      state: 'showing-requests.list'
    });

    // Add the dropdown create item
    menuService.addSubMenuItem('topbar', 'showing-requests', {
      title: 'Create Showing request',
      state: 'showing-requests.create',
      roles: ['user']
    });
  }
}());
