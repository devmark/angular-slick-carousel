angular-slick-carousel
======================

Angular directive for [slick-carousel](http://kenwheeler.github.io/slick/)

Release: 2.0
------------
1. Singlemost improvement which triggered the development of this release: the `$timeout` in v1.0
was working but arbitrary. We now register a simple `onFinishRender` directive which
allows us to postpone slickification until `ng-repeat` has finished execution.
2. **[BC-BREAK]** The directive is no longer based on a transclude functionality. You can either use the 2.0
 directive with the provided template or use your own (when using the `src` attribute).
3. **[BC-BREAK]** The directive no longer supports statically provided image assets out-of-the-box.
The dynamic usecase is what it tries to solve optimally.
4. You should now use JS to specify a variety of sources in the `media` array. See [example](https://github.com/kbdaitch/angular-slick-carousel/blob/master/example/index.html).

Usage
-----

This directive allows you to use the slick-carousel plugin as
an angular directive. It can be specified in your HTML
as either a `<div>` attribute or a `<slick>` element.

```html
<slick settings="scoped-settings"
  control="scoped-control-handle"
  media="media" 
  src="optionalCustomTemplate.html"
  on-directive-init="onDirectiveInit()"
  is-image="isImage(media)" 
  is-video="isVideo(media)>
</slick>
```

### Attributes ###
1. `settings`: optional `Object` containing any of the slick options. Consult [here](http://kenwheeler.github.io/slick/#settings).
2. `control`: optional `Object` discussed [below](#control) in detail
3. `media`: mandatory `Array` of images and/or video
4. `src`: optional `String` the url for the custom template, if desired
4. `on-directive-init`: optional `Function` the directive's handle object is ready to use in this function. This is different from `slick`'s `onInit` handler.
5. `is-image`: optional `Function` that takes a metadata object and returns a `Boolean`
6. `is-video`: optional `Function` that takes a metadata object and returns a `Boolean`

### Steps ###
1. Include the `slick.js` at the base of this repo, or install through `bower`:

  ```bash
  bower install angular-slick-carousel
  ```

2. Add it to your HTML using usual `<script>` tags.
3. In your angular app definition, define `bardo.directives` as a dependency.
  ```js
  angular.module('slickExampleApp', ['bardo.directives'])
  ```

4. That should be it. Now, you can specify the usual
 options to the carousel plugin using either a JavaScript
`settings` object on `scope`, or as `data-<setting-name>`
 attributes in the HTML tag itself. Note that specifying `data-` prefixed names
 helps avoid issues with camel-cased settings options.

### Control ###
1. All the functions in the plugin are exposed through a control
attribute.
2. To utilize this architecture, and have two-way data-binding,
define an empty control handle on scope:
  ```js
  $scope.slickHandle = {

  };
```

3. Pass it as the value to control attribute. Now, you can call any plugin methods
as shown in the example.

  ```html
  <button ng-click="slickHandle.slickGoTo(2)">slickGoTo(2)</button>
  <button ng-click="slickHandle.slickPrev()">slickPrev()</button>
  <button ng-click="slickHandle.slickNext()">slickNext()</button>
  <button ng-click='slickHandle.slickAdd("<div>New</div>")'>slickAdd()</button>
  <button ng-click='slickHandle.slickRemove(3)'>slickRemove(3)</button>
  <button ng-click='slickHandle.slickPlay()'>slickPlay()</button>
  <button ng-click='slickHandle.slickPause()'>slickPause()</button>
  ```

Demo
----

1. Look at the [example](https://github.com/kbdaitch/angular-slick-carousel/tree/master/example) in this repo for full usage.
2. Running [example](http://bardo.io/angular-slick-carousel/app/index.html).
3. Or, clone the repo and run a simple HTTP server in the example directory.

[![Support via Gratipay](https://cdn.rawgit.com/twolfson/gittip-badge/1.1.0/dist/gratipay.png)](https://www.gratipay.com/kbdaitch/)
