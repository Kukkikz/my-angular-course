(function () {
'use strict';

angular.module('MenuApp')
.controller('ItemsController', ItemsController);

ItemsController.$inject = ['item'];
function ItemsController (item) {
  var category = this;
  category.name = item.data.category.name;
  category.items = item.data.menu_items;
  console.log("category name", category.name);
  console.log("menu", category.items);
}

})();
