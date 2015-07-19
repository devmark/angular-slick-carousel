angular-slick-carousel
======================

[![Join the chat at https://gitter.im/devmark/angular-slick-carousel](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/devmark/angular-slick-carousel?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

Angular directive for [slick-carousel](http://kenwheeler.github.io/slick/)

Release: 3.0
------------
1. recode 
2. support global config
3. added full callback
4. slider control

Download
-----
- Using [bower](http://bower.io/) to install it. `bower install angular-slick-carousel`
- [Download](https://github.com/devmark/angular-slick-carousel/archive/master.zip) from github.

Usage
-----

### Code
Add the sortable module as a dependency to your application module: `slickCarousel`

```js
var myAppModule = angular.module('MyApp', ['slickCarousel'])
```

This directive allows you to use the slick-carousel plugin as
an angular directive. It can be specified in your HTML
as either a `<div>` attribute or a `<slick>` element.

```html
    <slick infinite=true slides-to-show=3 slides-to-scroll=3>
    ...
    </slick>
    
    <slick 
        settings="slickConfig"
        data="number">
    </slick>
```

### Attributes ###
`settings`: optional `Object` containing any of the slick options. Consult [here](http://kenwheeler.github.io/slick/#settings).
 - `method` optional containing slick method. discussed [below](#method) in detail
 - `event` optional containing slick event

```javascript
$scope.slickConfig = {
    autoplay: true,
    draggable: false,  
    autoplaySpeed: 3000,
    method: {},
    event: {
        beforeChange: function (event, slick, currentSlide, nextSlide) {
        },
        afterChange: function (event, slick, currentSlide, nextSlide) {
        }
    }
};
```
`data`: object for ng-repeat data

### Method ###
1. All the functions in the plugin are exposed through a control
attribute.
2. To utilize this architecture, and have two-way data-binding,
define an empty control handle on scope:
  ```js
    $scope.slickConfig = {
        method: {}
    }
```
3. Pass it as the value to control attribute. Now, you can call any plugin methods
as shown in the example.

  ```html
  <button ng-click="slickConfig.method.slickGoTo(2)">slickGoTo(2)</button>
  <button ng-click="slickConfig.method.slickPrev()">slickPrev()</button>
  <button ng-click="slickConfig.method.slickNext()">slickNext()</button>
  <button ng-click='slickConfig.method.slickAdd("<div>New</div>")'>slickAdd()</button>
  <button ng-click='slickConfig.method.slickRemove(3)'>slickRemove(3)</button>
  <button ng-click='slickConfig.method.slickPlay()'>slickPlay()</button>
  <button ng-click='slickConfig.method.slickPause()'>slickPause()</button>
  ```
  
  
TODO
-----
- create unit test

