(function () {
'use strict';

angular.module('MenuApp')
.config(RoutesConfig);

RoutesConfig.$inject = ['$stateProvider', '$urlRouterProvider'];

function RoutesConfig($stateProvider,$urlRouterProvider) {

  $urlRouterProvider.otherwise('/');

  $stateProvider

  .state('home', {
    url: '/',
    templateUrl: 'src/menuapp/templates/home.template.html'
  })

  .state('categories', {
    url: '/categories',
    templateUrl: 'src/menuapp/templates/main-categories.template.html',
    controller: 'CategoriesController as categories',
    resolve: {
      items: ['MenuDataService', function (MenuDataService) {
        return MenuDataService.getAllCategories();
      }]
    }
  })

  .state('items', {
    url: '/items/{categoryShortName}',
    templateUrl: 'src/menuapp/templates/main-items.template.html',
    controller: 'ItemsController as category',
    resolve: {
      item: ['$stateParams', 'MenuDataService',
            function ($stateParams, MenuDataService) {
              console.log($stateParams.categoryShortName);
              return MenuDataService.getItemsForCategory($stateParams.categoryShortName);
            }]
    }
  })

};

})();
