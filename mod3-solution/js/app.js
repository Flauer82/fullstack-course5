(function () {
'use strict';

//Module declaration
angular.module('NarrowItDownApp', [])
.controller('NarrowItDownController', NarrowItDownController)
.service('MenuSearchService', MenuSearchService)
.directive('foundItems', FoundItemsDirective)
.constant('ApiBasePath', "https://davids-restaurant.herokuapp.com/menu_items.json");

//Directive definition
function FoundItemsDirective() {
  var ddo = {
    templateUrl: 'foundItems.html',
    restrict: "E",
    scope: {
      foundItems: '<',
      onRemove: '&'
    }
  };

  return ddo;
}

//Controller definition
NarrowItDownController.$inject = ['MenuSearchService'];
function NarrowItDownController(MenuSearchService) {
  var menu = this;
  menu.found = [];
  menu.searchTerm = '';

  menu.getItems = function() {
    if (!(menu.searchTerm)) {
      menu.found = null;
      return;
    }
    menu.found = [];

    var promise = MenuSearchService.getMatchedMenuItems(menu.searchTerm);
    promise.then(function (response) {
      menu.found = response;
    })
    .catch(function (error) {
      console.log("Something went terribly wrong.");
    });
  }


  menu.removeItem = function (index) {
    menu.found.splice(index, 1);
  }
}

// Service definition
MenuSearchService.$inject = ['$http', 'ApiBasePath']
function MenuSearchService($http, ApiBasePath) {
  var service = this;

  service.getMatchedMenuItems = function(searchTerm) {
    return $http({
      method: "GET",
      url: ApiBasePath
    }).then(function (result) {
      // process result and only keep items that match
      if (searchTerm == false)
        return [];

      var foundItems = [];
      var list = result.data.menu_items;

      for (var i = 0; i < list.length; i++) {
        var description = list[i].description;
        // console.log(description);
        if (description.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1) {
          foundItems.push(list[i]);
        }
      }
      if (foundItems.length === 0)
        // nothing is found as a result of the search
        return null;

      // return processed items
      return foundItems;
    });
  }
}

})();
