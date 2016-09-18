(function () {
'use strict';

angular.module('LunchCheck', [])
.controller('LunchCheckController', LunchCheckController);

LunchCheckController.$inject = ['$scope'];
function LunchCheckController($scope) {
  $scope.message = "";
  $scope.dishes = "";
  $scope.checkDishes = function() {
    console.log(dishesLength);
    if ($scope.dishes.toString() == "") {
      // dishes is empty
      $scope.message = "Please enter data first";
    } else {
        var dishesLength = $scope.dishes.toString().split(",").length;
          if (dishesLength <= 3 ) {
            $scope.message = "Enjoy!";
          } else {
            $scope.message = "Too much!";
          }
  }
  };
}
})();
