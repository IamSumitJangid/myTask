(function() {

    'use strict';

    angular.module('Home').controller('AllDoctorsController', AllDoctorsController);
    AllDoctorsController.$inject = ['$scope', '$state', 'listDoctors'];

    function AllDoctorsController($scope, $state, listDoctors) {
        var allDoctorsCtrl = this;
        allDoctorsCtrl.listDoctors = listDoctors.data;
        console.log(listDoctors);
        allDoctorsCtrl.actionList = ['TimeSlot', 'Update', 'Delete'];
        
        allDoctorsCtrl.addNew = function () {
        	$state.go('home.add Update Doctor', {action: 'Add', id: -1});
        }

        allDoctorsCtrl.actionClick = function(actionName, objDoctor) {
        	if(actionName == 'TimeSlot') {
        		$state.go('home.getTimeslot', {id: objDoctor.doctorId});
        	} else if (actionName == 'Update') {
        		$state.go('home.add Update Doctor', {action: actionName, id: objDoctor.doctorId});
        	} else if (actionName == 'Delete') {

        	} else {
        		alert("Unknown Action");
        	}
        }

        // to sort table
        $scope.sortTable = function (order) {
        	$scope.sort = order;
        }

    }
})();