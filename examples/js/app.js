'use strict';

angular.module('slickExampleApp', ['slickCarousel', 'ngRoute'])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'views/home.html',
                controller: 'SlickController'
            })
            .otherwise({
                redirectTo: '/'
            });
    }])
    .config(['slickCarouselConfig', function (slickCarouselConfig) {
        slickCarouselConfig.dots = true;
        slickCarouselConfig.autoplay = false;
    }])
    .controller('SlickController', function ($scope, $timeout, $compile) {
        $scope.number = [{label: 1}, {label: 2}, {label: 3}, {label: 4}, {label: 5}, {label: 6}, {label: 7}, {label: 8}];
        $scope.number2 = [{label: 1}, {label: 2}, {label: 3}, {label: 4}, {label: 5}, {label: 6}, {label: 7}, {label: 8}];
        $scope.number3 = [{label: 1}, {label: 2}, {label: 3}, {label: 4}, {label: 5}, {label: 6}, {label: 7}, {label: 8}];
        $scope.number4 = [{label: 225}, {label: 125}, {label: 200}, {label: 175}, {label: 150}, {label: 180}, {label: 300}, {label: 400}];

        $scope.slideAdd = function (object) {
            $scope[object].push({label: Math.floor((Math.random() * 10) + 100)});
        };

        $scope.slickConfig = {
            autoplay:true,
            infinite: true,
            autoplaySpeed: 3000,
            method: {},
            event: {
                beforeChange: function (event, slick, currentSlide, nextSlide) {
                    console.log('before change');
                },
                afterChange: function (event, slick, currentSlide, nextSlide) {

                },
                breakpoint: function (event, slick, breakpoint) {
                    console.log('breakpoint');
                },
                destroy: function (event, slick) {
                    console.log('destroy');
                },
                edge: function (event, slick, direction) {
                    console.log('edge');
                },
                reInit: function (event, slick) {
                    console.log('re-init');
                },
                init: function (event, slick) {
                    console.log('init');
                },
                setPosition: function (evnet, slick) {
                    console.log('setPosition');
                },
                swipe: function (event, slick, direction) {
                    console.log('swipe');
                }
            }
        };

        $scope.slickConfig2 = {
            method: {},
            slidesToShow: 3,
            slidesToScroll: 3
        };

        $scope.slickConfig3 = {
            method: {},
            dots: true,
            infinite: false,
            speed: 300,
            slidesToShow: 4,
            slidesToScroll: 4,
            responsive: [
                {
                    breakpoint: 1024,
                    settings: {
                        slidesToShow: 3,
                        slidesToScroll: 3,
                        infinite: true,
                        dots: true
                    }
                },
                {
                    breakpoint: 600,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 2
                    }
                },
                {
                    breakpoint: 480,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1
                    }
                }
            ]
        };

        $scope.slickConfig4 = {
            method: {},
            dots: true,
            infinite: true,
            speed: 300,
            slidesToShow: 1,
            centerMode: true,
            variableWidth: true
        };

    });

