'use strict';

describe('Directive: ngLogout', function () {

  // load the directive's module
  beforeEach(module('tipntripApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<ng-logout></ng-logout>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the ngLogout directive');
  }));
});
