(function () {
    'use strict';

    angular
        .module('app')
        .factory('AttendanceService', AttendanceService);

    AttendanceService.$inject = ['$http'];
    function AttendanceService($http) {
        var service = {};

        service.GetAll = GetAll;
        service.GetAllUsers = GetAllUsers;
        service.GetById = GetById;
        service.loadFault = loadFault;
        service.stateChanged = stateChanged;
        service.updateObj = updateObj;

        /*service.updateFault = updateFault;*/

        return service;

        function GetAll(id) {
            return $http.post('http://localhost:9299/powerapi/rest/chat/users')
  			.then(handleSuccess, handleError('Error getting all users'));
          }
        function GetAllUsers(id) {
          return $http.post('http://localhost:9299/powerapi/rest/chat/'+id)
			.then(handleSuccess, handleError('Error getting all users'));
        }

        function GetById(id) {
            return $http.get('/api/users/' + id).then(handleSuccess, handleError('Error getting user by id'));
        }
        function loadFault(id) {
        	console.log(id);
        	return $http.post('http://localhost:9299/powerapi/rest/register/faultReportList')
			.then(handleSuccess, handleError('Error getting all users'));
        }
     /*   function updateFault(fault) {
        	console.log(fault);
        	return $http.post('http://localhost:9299/powerapi/rest/angular/updateFault/'+fault.c_id, fault)
			.then(handleSuccess, handleError('Error getting while updating fault with id:'+fault.c_id));
        }*/
        function updateObj(obj) {
        	console.log(obj);
        	var result = $.param(obj);
        	return $http.post('http://localhost:9299/powerapi/rest/angular/user/update?'+result, obj)
			.then(handleSuccess, handleError('Error getting while updating fault with id:'+obj.id));
        }

        function stateChanged(obj) {
        	//console.log(obj);
        	return $http.post('http://localhost:9299/powerapi/rest/angular/user/'+obj.obj.id+'/'+obj.isPr)
			.then(handleSuccess, handleError('Error Posting Data To Server:'));
        }

       // private functions

        function handleSuccess(res) {
        	console.log(res.data);

            return res.data;
        }

        function handleError(error) {
            return function () {
            	console.log(error);
                return { success: false, message: error };
            };
        }
    }

})();