/// <reference path="../../bower_components/dt-angular/angular.d.ts" />

'use strict';

module b2 {
  angular.module('b2', ['ngAnimate', 'ngCookies', 'ngTouch', 'ngSanitize', 'ngMaterial'])
    .controller('MainCtrl', MainCtrl)
    .controller('NavbarCtrl', NavbarCtrl)
    ;
}
