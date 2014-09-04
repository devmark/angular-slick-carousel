'use strict';

describe('Slick directive tests', function() {
  beforeEach(module('bardo.directives'));

  var $scope, $compile;
  beforeEach(inject(function (_$compile_, $injector, $rootScope, $templateCache) {
      $compile = _$compile_;

      $templateCache.put('angular-slick-carousel/custom-template.html', '<div class=\"multiple\" ng-repeat=\"m in media\" on-finish-render=\"init()\">\n  <img ng-if=\"isImage({media: m})\" ng-src=\"{{m.src}}\" />\n  <video ng-if=\"isVideo({media: m})\" ng-src=\"{{m.src}}\" type=\"{{m.mimeType}}\" ></video>\n</div>');
      $scope = $rootScope.$new();
      $scope.media = [

      ];
  }));

    describe('Success: default template', function() {
        it('adds a class of bardo-slick', function() {
            var element = angular.element('<slick media="media"></slick>');
            $compile(element)($scope);
            $scope.$apply();
            expect(element.hasClass('bardo-slick')).toBe(true);
        });
    });

    describe('Success: custom template', function() {
        it('adds a class of bardo-slick', function() {
            var element = angular.element('<slick src="angular-slick-carousel/custom-template.html" media="media"></slick>');
            $compile(element)($scope);
            $scope.$apply();
            expect(element.hasClass('bardo-slick')).toBe(true);
        });
    });
});