(function () {
'use strict';


angular.module('myFirstApp', [])

.controller('MyFirstController', function ($scope) {
  $scope.name = "Pranot";
  $scope.sayHello = function () {
    return "Hello";
  };

});

})();
