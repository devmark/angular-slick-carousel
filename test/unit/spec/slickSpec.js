'use strict';

describe('Slick directive tests', function() {
  beforeEach(module('bardo.directives'));

  var $scope;
  var element;
  beforeEach(inject(function ($compile, $rootScope) {
      $scope = $rootScope;
      element = angular.element('\
      <slick>\
        <div class="multiple">\
          <img src="http://www.deshow.net/d/file/travel/2009-04/scenic-beauty-of-nature-photography-1-503-2.jpg"></img>\
        </div>\
        <div class="multiple">\
          <iframe src="https://www.youtube.com/embed/UzyoT4DziQ4" frameborder="0" width="560" height="315"></iframe>\
        </div>\
        <div class="multiple">\
          <iframe src="https://www.youtube.com/embed/fFLrdhf0_QM" frameborder="0" width="560" height="315"></iframe>\
        </div>\
      </slick>');
      $compile(element)($rootScope);
  }));

  it('adds a class of bardo-slick', function() {
    expect(element.hasClass('bardo-slick')).toBe(true);
  });
});
