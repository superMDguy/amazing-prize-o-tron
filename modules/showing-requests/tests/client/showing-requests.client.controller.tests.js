(function () {
  'use strict';

  describe('Showing Requests Controller Tests', function () {
    // Initialize global variables
    var ShowingRequestsController,
      $scope,
      $httpBackend,
      $state,
      Authentication,
      ShowingRequestsService,
      mockShowingRequest;

    // The $resource service augments the response object with methods for updating and deleting the resource.
    // If we were to use the standard toEqual matcher, our tests would fail because the test values would not match
    // the responses exactly. To solve the problem, we define a new toEqualData Jasmine matcher.
    // When the toEqualData matcher compares two objects, it takes only object properties into
    // account and ignores methods.
    beforeEach(function () {
      jasmine.addMatchers({
        toEqualData: function (util, customEqualityTesters) {
          return {
            compare: function (actual, expected) {
              return {
                pass: angular.equals(actual, expected)
              };
            }
          };
        }
      });
    });

    // Then we can start by loading the main application module
    beforeEach(module(ApplicationConfiguration.applicationModuleName));

    // The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
    // This allows us to inject a service but then attach it to a variable
    // with the same name as the service.
    beforeEach(inject(function ($controller, $rootScope, _$state_, _$httpBackend_, _Authentication_, _ShowingRequestsService_) {
      // Set a new global scope
      $scope = $rootScope.$new();

      // Point global variables to injected services
      $httpBackend = _$httpBackend_;
      $state = _$state_;
      Authentication = _Authentication_;
      ShowingRequestsService = _ShowingRequestsService_;

      // create mock Showing Request
      mockShowingRequest = new ShowingRequestsService({
        _id: '525a8422f6d0f87f0e407a33',
        name: 'Showing Request Name'
      });

      // Mock logged in user
      Authentication.user = {
        roles: ['user']
      };

      // Initialize the Showing Requests controller.
      ShowingRequestsController = $controller('ShowingRequestsController as vm', {
        $scope: $scope,
        showingRequestResolve: {}
      });

      // Spy on state go
      spyOn($state, 'go');
    }));

    describe('vm.save() as create', function () {
      var sampleShowingRequestPostData;

      beforeEach(function () {
        // Create a sample Showing Request object
        sampleShowingRequestPostData = new ShowingRequestsService({
          name: 'Showing Request Name'
        });

        $scope.vm.showingRequest = sampleShowingRequestPostData;
      });

      it('should send a POST request with the form input values and then locate to new object URL', inject(function (ShowingRequestsService) {
        // Set POST response
        $httpBackend.expectPOST('api/showing-requests', sampleShowingRequestPostData).respond(mockShowingRequest);

        // Ignore parent template get on state transition
        $httpBackend.whenGET('/modules/core/client/views/home.client.view.html').respond(200, '');

        // Run controller functionality
        $scope.vm.save(true);
        $httpBackend.flush();

        // Test URL redirection after the Showing Request was created
        expect($state.go).toHaveBeenCalledWith('showing-requests.view', {
          showingRequestId: mockShowingRequest._id
        });
      }));

      it('should set $scope.vm.error if error', function () {
        var errorMessage = 'this is an error message';
        $httpBackend.expectPOST('api/showing-requests', sampleShowingRequestPostData).respond(400, {
          message: errorMessage
        });

        // Ignore parent template get on state transition
        $httpBackend.whenGET('/modules/core/client/views/home.client.view.html').respond(200, '');

        $scope.vm.save(true);
        $httpBackend.flush();

        expect($scope.vm.error).toBe(errorMessage);
      });
    });

    describe('vm.save() as update', function () {
      beforeEach(function () {
        // Mock Showing Request in $scope
        $scope.vm.showingRequest = mockShowingRequest;
      });

      it('should update a valid Showing Request', inject(function (ShowingRequestsService) {
        // Set PUT response
        $httpBackend.expectPUT(/api\/showing-requests\/([0-9a-fA-F]{24})$/).respond();

        // Ignore parent template get on state transition
        $httpBackend.whenGET('/modules/core/client/views/home.client.view.html').respond(200, '');

        // Run controller functionality
        $scope.vm.save(true);
        $httpBackend.flush();

        // Test URL location to new object
        expect($state.go).toHaveBeenCalledWith('showing-requests.view', {
          showingRequestId: mockShowingRequest._id
        });
      }));

      it('should set $scope.vm.error if error', inject(function (ShowingRequestsService) {
        var errorMessage = 'error';
        $httpBackend.expectPUT(/api\/showing-requests\/([0-9a-fA-F]{24})$/).respond(400, {
          message: errorMessage
        });

        // Ignore parent template get on state transition
        $httpBackend.whenGET('/modules/core/client/views/home.client.view.html').respond(200, '');

        $scope.vm.save(true);
        $httpBackend.flush();

        expect($scope.vm.error).toBe(errorMessage);
      }));
    });

    describe('vm.remove()', function () {
      beforeEach(function () {
        // Setup Showing Requests
        $scope.vm.showingRequest = mockShowingRequest;
      });

      it('should delete the Showing Request and redirect to Showing Requests', function () {
        // Return true on confirm message
        spyOn(window, 'confirm').and.returnValue(true);

        $httpBackend.expectDELETE(/api\/showing-requests\/([0-9a-fA-F]{24})$/).respond(204);

        // Ignore parent template get on state transition
        $httpBackend.whenGET('/modules/core/client/views/home.client.view.html').respond(200, '');

        $scope.vm.remove();
        $httpBackend.flush();

        expect($state.go).toHaveBeenCalledWith('showing-requests.list');
      });

      it('should should not delete the Showing Request and not redirect', function () {
        // Return false on confirm message
        spyOn(window, 'confirm').and.returnValue(false);

        $scope.vm.remove();

        expect($state.go).not.toHaveBeenCalled();
      });
    });
  });
}());
