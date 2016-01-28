'use strict';

describe('Service: cityFactory', function () {

  // load the service's module
  beforeEach(module('tipntripApp'));

  // instantiate service
  var cityFactory;
  beforeEach(inject(function (_cityFactory_) {
    cityFactory = _cityFactory_;
  }));

  it('should do something', function () {
    expect(!!cityFactory).toBe(true);
  });

});
