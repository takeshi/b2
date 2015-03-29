'use strict';

module b2 {

  interface INavbarScope extends ng.IScope {
    date: Date
  }

  class NavbarController {
    constructor ($scope: INavbarScope) {
      $scope.date = new Date();
    }
  }

}
