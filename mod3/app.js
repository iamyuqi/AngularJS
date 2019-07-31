(function () {
'use strict';

angular.module('NarrowItDownApp', [])
.controller('NarrowItDownController', NarrowItDownController)
.service('MenuSearchService', MenuSearchService)
.constant('RESTApi', "https://davids-restaurant.herokuapp.com/menu_items.json")
.directive('FoundItems', FoundItemsDirective);

function FoundItemsDirective() {
    var ddo = {
        restrict: 'E',
        templateUrl: 'foundItems.html',
        scope: {
            foundItems: '<',
            title: '@title',
            onEmpty: '<',
            onRemove: '&'
        },
    controller: NarrowItDownController,
    controllerAs: 'menu',
    bindToController: true,
    };
    return ddo
}

NarrowItDownController.$inject = ['MenuSearchService'];
function NarrowItDownController(MenuSearchService) {
    var menu = this;
    menu.name = '';

    menu.matchItems = function(searchTerm) {
        var promise = MenuSearchService.GetMatchedMenuItems(searchTerm);

        promise.then(function (items) {
            if (items.length > 0) {
                menu.found = items;
            }else {
                menu.message = 'Nothing Found!';
                menu.found = [];
            }
        })
    };

    menu.removeItem = function (itemIndex) {
        menu.found.splice(itemIndex, 1);
    }
}

MenuSearchService.$inject = ['$http', 'RESTApi'];
function MenuSearchService($http, RESTApi) {
    var service = this;

    service.GetMatchedMenuItems = function(searchTerm) {
        return $http({
            method: 'GET',
            url: (RESTApi)
        }).then(function(result) {
            var menuItems = result.data.menu_items;
            var foundItems = [];

            for(var i = 0; i < menuItems.length; i++){
                if (menuItems[i].des.indexOf(searchTerm) > 0) {
                    foundItems.push(menuItems[i]);
                }
            }
            return foundItems;
        });
    }
}

})();