'use strict';

module b2 {
  class Thing {
    public rank: number;

    constructor(
      public title: string,
      public url: string,
      public description: string,
      public logo: string
    ) {
      this.rank = Math.random();
    }
  }

  interface IMainScope extends ng.IScope {
    awesomeThings: Thing[]
  }


  class AppController {
    constructor ($scope: IMainScope) {
      var awesomeThings = [
      {
        'title': 'AngularJS',
        'url': 'https://angularjs.org/',
        'description': 'HTML enhanced for web apps!',
        'logo': 'angular.png'
      }
    ];

      $scope.awesomeThings = new Array<Thing>();

      awesomeThings.forEach(function(awesomeThing) {
        $scope.awesomeThings.push(new Thing(
          awesomeThing.title,
          awesomeThing.url,
          awesomeThing.description,
          awesomeThing.logo
        ));
      });
    }
  }

}
