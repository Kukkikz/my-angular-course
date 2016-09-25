(function () {
'use strict';

angular.module('ShoppingListCheckOff',[])
.controller('ToBuyShoppingController', ToBuyShoppingController)
.controller('AlreadyBoughtShoppingController', AlreadyBoughtShoppingController)
.service('ShoppingListCheckOffService', ShoppingListCheckOffService);

ToBuyShoppingController.$inject = ['ShoppingListCheckOffService'];
function ToBuyShoppingController (ShoppingListCheckOffService) {
  var toBuyList = this;

  toBuyList.items = ShoppingListCheckOffService.getToBuyList();

  toBuyList.checkoff = function (index){
    ShoppingListCheckOffService.checkoff(index);
  };
};

AlreadyBoughtShoppingController.$inject = ['ShoppingListCheckOffService'];
function AlreadyBoughtShoppingController (ShoppingListCheckOffService){
  var boughtList = this;
  boughtList.items = ShoppingListCheckOffService.getBoughtList();

};

function ShoppingListCheckOffService () {
  var service = this;
  var toBuyList = [
    {
      name: "cookies",
      quantity: "10"
    },
    {
      name: "soda",
      quantity: "5"
    },
    {
      name: "milk",
      quantity: "1"
    },
    {
      name: "beer",
      quantity: "5"
    },
    {
      name: "apples",
      quantity: "3"
    },
    {
      name: "eggs",
      quantity: "2"
    }
  ];
  var boughtListitems = [];

  service.checkoff = function (index){
    boughtListitems.push(toBuyList[index]);
    toBuyList.splice(index,1);
  };

  service.getToBuyList = function () {
    return toBuyList;
  };

  service.getBoughtList = function () {
    return boughtListitems;
  };

};

})();
