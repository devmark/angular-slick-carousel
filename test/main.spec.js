'use strict';

describe('angular slick testing', function () {
  var scope, $rootScope, $compile, $timeout, $injector;

  beforeEach(module('slickCarousel'));

  beforeEach(inject(function (_$rootScope_, _$compile_, _$timeout_, _$injector_) {
    $rootScope = _$rootScope_;
    scope = $rootScope.$new();
    $compile = _$compile_;
    $timeout = _$timeout_;
    $injector = _$injector_;

    scope.date = [
      {id: 1, name: 'Mark', email: 'adam@email.com'},
      {id: 2, name: 'Ken', email: 'adam@email.com'},
      {id: 3, name: 'Oren', email: 'adam@email.com'},
      {id: 4, name: 'Kenny', email: 'adam@email.com'}
    ];
  }));

  // DSL (domain-specific language)
  function compileTemplate(template) {
    var el = $compile(angular.element(template))(scope);
    scope.$digest();
    $timeout.flush();
    return el;
  }

  it('should init', function () {
    var element = compileTemplate('\
      <slick>\
      <div> 1 </div>\
      <div> 2 </div>\
      </slick>');
    scope.$digest();
    expect(element.hasClass('slick-initialized')).toBe(true);
  });

  it('should init if ng-if is true', function () {
    scope.slickConfigLoaded = true;
    var element = compileTemplate('\
      <slick ng-if="1">\
      <div> 1 </div>\
      <div> 2 </div>\
      </slick>');
    scope.$digest();
    expect(element.next().hasClass('slick-initialized')).toBe(true);
  });

  it('should re-init if change ng-if', function () {
    scope.slickConfigLoaded = true;
    var element = compileTemplate('\
      <slick ng-if="slickConfigLoaded">\
      <div ng-repeat="i in data">\
        <div> i </div>\
      </slick>');
    scope.$digest();
    expect(element.next().hasClass('slick-initialized')).toBe(true);
  });

  it('should re-init if config change', function () {
    scope.isDestroy = false;
    scope.slickConfig = {
      autoplay: true,
      event: {
        destroy: function (event, slick) {
          scope.isDestroy = true;
        }
      }
    };
    var element = compileTemplate('\
      <slick settings="slickConfig">\
      <div ng-repeat="i in data">\
        <div> i </div>\
      </slick>');
    scope.$digest();

    expect(element.hasClass('slick-initialized')).toBe(true);

    scope.slickConfig.autoplay = false;
    scope.$digest();
    $timeout.flush();
    expect(scope.isDestroy).toBe(true);
    expect(element.hasClass('slick-initialized')).toBe(true);

  });

});
