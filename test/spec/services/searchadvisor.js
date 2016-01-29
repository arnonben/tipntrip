'use strict';

describe('Service: searchAdvisor', function () {

  // load the service's module
  beforeEach(module('tipntripApp'));

  // instantiate service
  var searchAdvisor;
  beforeEach(inject(function (_searchAdvisor_) {
    searchAdvisor = _searchAdvisor_;
  }));

  it('should do something', function () {
    expect(!!searchAdvisor).toBe(true);
  });

});
