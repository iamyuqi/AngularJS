(function () {
'use strict';

angular.module('LunchCheck', [])
.controller('MsgController', MsgController);

MSgController.$inject = ['$scope'];
function MsgController($scope) {
    $scope.items = "";
    $scope.totalItems = 0;
    $scope.msg = "";

    $scope.displayNumeric = function () {
        var totalSItms = $scope.items.split(",").length;
        $scope.totalItems = totalSItms;
    };

    $scope.lunchCheck = function () {
        if($scope.totalItems == 0){
            $scope.msg = "Please enter data first";
        }
        else if($scope.totalItems < 4){
            $scope.msg = "Enjoy!";
        }
        else{
            $scope.msg = "Too Much!";
        }
    };
}

})();