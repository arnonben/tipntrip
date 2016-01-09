'use strict';

describe('Controller: RegisteradvisorCtrl', function () {

  // load the controller's module
  beforeEach(module('tipntripApp'));

  var RegisteradvisorCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    RegisteradvisorCtrl = $controller('RegisterAdvisorCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
