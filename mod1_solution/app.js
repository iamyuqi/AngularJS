(function () {
'use strict';

angular.module('LunchCheck', [])
.controller('MsgController', MsgController);

MSgController.$inject = ['$scope'];
function MsgController($scope) {
    $scope.items = "";
    $scope.totalItems = 0;
    $scope.msg = "";
    $scope.style = {color: 'black'};

    $scope.displayNumeric = function () {
        var totalSItms = CalculatItemNumber($scope.items);
        $scope.totalItems = totalSItms;
    };

    $scope.lunchCheck = function () {
        if($scope.totalItems == 0){
            $scope.msg = "Please enter data first";
            $scope.style = {color: 'red'};
        }
        else if($scope.totalItems < 4){
            $scope.msg = "Enjoy!";
            $scope.style = {color: 'green'};
        }
        else{
            $scope.msg = "Too Much!";
            $scope.style = {color: 'green'};
        }
    };
}
    function CalculatItemNumber(string){
        var totalItemNumber = 0;
        for (var i = 0; i < string.length; i++) {
            totalItemNumber = string.split(",").length;
    }
        return totalItemNumber;
    }
})();