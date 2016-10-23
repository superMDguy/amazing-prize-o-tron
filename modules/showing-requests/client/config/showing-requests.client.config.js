(function () {
  'use strict';

  angular
    .module('showing-requests')
    .run(menuConfig);

  menuConfig.$inject = ['menuService'];

  function menuConfig(menuService) {
    // Set top bar menu items
    menuService.addMenuItem('topbar', {
      title: 'Showing Requests',
      state: 'showing-requests',
      type: 'dropdown',
      roles: ['*']
    });

    // Add the dropdown list item
    menuService.addSubMenuItem('topbar', 'showing-requests', {
      title: 'List Showing Requests',
      state: 'showing-requests.list',
      roles: ['user', 'admin']
    });

    // Add the dropdown create item
    menuService.addSubMenuItem('topbar', 'showing-requests', {
      title: 'Create Showing Request',
      state: 'showing-requests.create'
    });
  }
}());
