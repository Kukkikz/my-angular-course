(function(){
'use strict';

angular.module('NarrowItDownApp', [])
.controller('NarrowItDownController', NarrowItDownController)
.service('MenuSearchService', MenuSearchService)
.directive('foundItems', FoundItemsDirective);

function FoundItemsDirective () {
  var ddo = {
    templateUrl: "foundItems.html",
    scope: {
      found: '<',
      onRemove: '&'
    },
    controller: NarrowItDownController,
    controllerAs: "menu",
    bindToController: true
  };
  return ddo;
};

NarrowItDownController.$inject = ['MenuSearchService'];
function NarrowItDownController (MenuSearchService) {
  var menu = this;
  menu.searchTerm = "";
  menu.found = [];
  menu.showError = false;

  menu.search = function () {
    if(menu.searchTerm != ""){
      var promise = MenuSearchService.getMatchedMenuItems (menu.searchTerm);
      promise.then(function (result) {
        menu.found = result;
        if(menu.found.length == 0){
          menu.showError = true;
        } else {
          menu.showError = false;
        }
      });
    } else {
      menu.found = [];
      menu.showError = true;
    }

    // checkNotFound();
  };

  menu.remove = function (index) {
    MenuSearchService.removeItem(menu.found,index);
  };

  function checkNotFound () {
    if(menu.searchTerm == "" || menu.found.length == 0) {
      menu.showError = true;
    }else{

      menu.showError = false;
    }
  };



};

MenuSearchService.$inject = ['$http'];
function MenuSearchService ($http) {
  var service = this;

  service.getMatchedMenuItems = function (searchTerm) {
    var response = $http({
      method: "GET",
      url: "https://davids-restaurant.herokuapp.com/menu_items.json"
    }).then(function (result) {
      var foundItems = [];
      for(var i=0;i<result.data.menu_items.length;i++){
        if(result.data.menu_items[i].description.indexOf(searchTerm) > -1){
          foundItems.push(result.data.menu_items[i]);
        }
      }

      return foundItems;
    });
    return response;
  };

  service.removeItem = function (found,index) {
    found.splice(index,1);
  };

};






})();
