'use strict';

module b2 {

  interface INavbarScope extends ng.IScope {
    date: Date
  }

  export class NavbarCtrl {
    /* @ngInject */
    constructor ($scope: INavbarScope) {
      $scope.date = new Date();
    }
  }

}
