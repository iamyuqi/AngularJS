(function () {
'use strict';

angular.module('ShoppingListCheckOff', [])
.controller('ToBuyController', ToBuyController)
.controller('AlreadyBoughtController', AlreadyBoughtController)
.service('ShoppingListCheckOffService', ShoppingListCheckOffService);

ToBuyController.$inject = ['ShoppingListCheckOffService'];
function ToBuyController(ShoppingListCheckOffService) {
  var toBuyList = this;
  toBuyList.items = ShoppingListCheckOffService.getItems();
  toBuyList.boughtItem = function (itemIndex) {
    ShoppingListCheckOffService.checkOutItem(itemIndex);
  }
}

AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
function AlreadyBoughtController(ShoppingListCheckOffService) {
  var boughtList = this;
  boughtList.items = ShoppingListCheckOffService.getBoughtItems();
}

function ShoppingListCheckOffService() {
  var service = this;

  // List of shopping items
  var items = [
      {name: "cookies", quantity: "10"},
      {name: "watermelon", quantity: "2"},
      {name: "udon", quantity: "6"},
      {name: "milk", quantity: "1"},
      {name: "chocolate", quantity: "9"},
      {name: "beer", quantity: "12"}];
  var boughtItems = [];

  service.getItems = function () {
      return items;
  };

  service.getBoughtItems = function(){
      return boughtItems;
  };

  service.checkOutItem = function (itemIndex) {
      var item = items[itemIndex];
      items.splice(itemIndex, 1);
      boughtItems.push(item);
  };
}

})();