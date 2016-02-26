'use strict';

describe('Controller: MainCtrl', function () {

  // load the controller's module
<<<<<<< HEAD
<<<<<<< HEAD
  beforeEach(module('tipntrip2App'));
=======
  beforeEach(module('chatApp'));
>>>>>>> 5499722b43192f31d826514ffb5f20afca3ad0d8
=======
  beforeEach(module('chatApp'));
=======
  beforeEach(module('tipntrip2App'));
>>>>>>> arnon
>>>>>>> 7ef80238459073e9277a565cb97f33b40467cfd5

  var MainCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    MainCtrl = $controller('MainCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
