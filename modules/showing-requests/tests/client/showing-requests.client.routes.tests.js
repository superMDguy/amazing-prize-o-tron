(function () {
  'use strict';

  describe('Showing requests Route Tests', function () {
    // Initialize global variables
    var $scope,
      ShowingRequestsService;

    // We can start by loading the main application module
    beforeEach(module(ApplicationConfiguration.applicationModuleName));

    // The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
    // This allows us to inject a service but then attach it to a variable
    // with the same name as the service.
    beforeEach(inject(function ($rootScope, _ShowingRequestsService_) {
      // Set a new global scope
      $scope = $rootScope.$new();
      ShowingRequestsService = _ShowingRequestsService_;
    }));

    describe('Route Config', function () {
      describe('Main Route', function () {
        var mainstate;
        beforeEach(inject(function ($state) {
          mainstate = $state.get('showing-requests');
        }));

        it('Should have the correct URL', function () {
          expect(mainstate.url).toEqual('/showing-requests');
        });

        it('Should be abstract', function () {
          expect(mainstate.abstract).toBe(true);
        });

        it('Should have template', function () {
          expect(mainstate.template).toBe('<ui-view/>');
        });
      });

      describe('View Route', function () {
        var viewstate,
          ShowingRequestsController,
          mockShowingRequest;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          viewstate = $state.get('showing-requests.view');
          $templateCache.put('modules/showing-requests/client/views/view-showing-request.client.view.html', '');

          // create mock Showing request
          mockShowingRequest = new ShowingRequestsService({
            _id: '525a8422f6d0f87f0e407a33',
            name: 'Showing request Name'
          });

          // Initialize Controller
          ShowingRequestsController = $controller('ShowingRequestsController as vm', {
            $scope: $scope,
            showingRequestResolve: mockShowingRequest
          });
        }));

        it('Should have the correct URL', function () {
          expect(viewstate.url).toEqual('/:showingRequestId');
        });

        it('Should have a resolve function', function () {
          expect(typeof viewstate.resolve).toEqual('object');
          expect(typeof viewstate.resolve.showingRequestResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(viewstate, {
            showingRequestId: 1
          })).toEqual('/showing-requests/1');
        }));

        it('should attach an Showing request to the controller scope', function () {
          expect($scope.vm.showingRequest._id).toBe(mockShowingRequest._id);
        });

        it('Should not be abstract', function () {
          expect(viewstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(viewstate.templateUrl).toBe('modules/showing-requests/client/views/view-showing-request.client.view.html');
        });
      });

      describe('Create Route', function () {
        var createstate,
          ShowingRequestsController,
          mockShowingRequest;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          createstate = $state.get('showing-requests.create');
          $templateCache.put('modules/showing-requests/client/views/form-showing-request.client.view.html', '');

          // create mock Showing request
          mockShowingRequest = new ShowingRequestsService();

          // Initialize Controller
          ShowingRequestsController = $controller('ShowingRequestsController as vm', {
            $scope: $scope,
            showingRequestResolve: mockShowingRequest
          });
        }));

        it('Should have the correct URL', function () {
          expect(createstate.url).toEqual('/create');
        });

        it('Should have a resolve function', function () {
          expect(typeof createstate.resolve).toEqual('object');
          expect(typeof createstate.resolve.showingRequestResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(createstate)).toEqual('/showing-requests/create');
        }));

        it('should attach an Showing request to the controller scope', function () {
          expect($scope.vm.showingRequest._id).toBe(mockShowingRequest._id);
          expect($scope.vm.showingRequest._id).toBe(undefined);
        });

        it('Should not be abstract', function () {
          expect(createstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(createstate.templateUrl).toBe('modules/showing-requests/client/views/form-showing-request.client.view.html');
        });
      });

      describe('Edit Route', function () {
        var editstate,
          ShowingRequestsController,
          mockShowingRequest;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          editstate = $state.get('showing-requests.edit');
          $templateCache.put('modules/showing-requests/client/views/form-showing-request.client.view.html', '');

          // create mock Showing request
          mockShowingRequest = new ShowingRequestsService({
            _id: '525a8422f6d0f87f0e407a33',
            name: 'Showing request Name'
          });

          // Initialize Controller
          ShowingRequestsController = $controller('ShowingRequestsController as vm', {
            $scope: $scope,
            showingRequestResolve: mockShowingRequest
          });
        }));

        it('Should have the correct URL', function () {
          expect(editstate.url).toEqual('/:showingRequestId/edit');
        });

        it('Should have a resolve function', function () {
          expect(typeof editstate.resolve).toEqual('object');
          expect(typeof editstate.resolve.showingRequestResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(editstate, {
            showingRequestId: 1
          })).toEqual('/showing-requests/1/edit');
        }));

        it('should attach an Showing request to the controller scope', function () {
          expect($scope.vm.showingRequest._id).toBe(mockShowingRequest._id);
        });

        it('Should not be abstract', function () {
          expect(editstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(editstate.templateUrl).toBe('modules/showing-requests/client/views/form-showing-request.client.view.html');
        });

        xit('Should go to unauthorized route', function () {

        });
      });

    });
  });
}());
