(function () {
    'use strict';

    angular
        .module('app')
        .factory('ProjectsService', ProjectsService);

    ProjectsService.$inject = ['$http'];
    function ProjectsService($http) {
        var service = {};

        service.GetAll = GetAll;
        service.GetById = GetById;
        service.loadFault = loadFault;
        service.updateFault = updateFault;
        /*service.createUser = createUser;*/
        service.saveUser = saveUser;
        service.loadAllclasses = loadAllclasses;

        return service;

        function GetAll() {
         /* return $http.post('http://localhost:9299/powerapi/rest/register/faultReportList')
			.then(handleSuccess, handleError('Error getting all users'));*/
        	return $http.post('http://localhost:9299/powerapi/rest/chat/0')
			.then(handleSuccess, handleError('Error getting all users'));
        }

        function loadAllclasses() {
            return $http.post('http://localhost:9299/powerapi/rest/chat/users')
  			.then(handleSuccess, handleError('Error getting all users'));
          }
        function GetById(id) {
            return $http.get('/api/users/' + id).then(handleSuccess, handleError('Error getting user by id'));
        }
        function loadFault(id) {
        	console.log(id);
        	return $http.post('http://localhost:9299/powerapi/rest/chat/0')
			.then(handleSuccess, handleError('Error getting all users'));
        }
        function updateFault(fault) {
        	console.log(fault);
        	return $http.post('http://localhost:9299/powerapi/rest/angular/updateFault/'+fault.c_id, fault)
			.then(handleSuccess, handleError('Error getting while updating fault with id:'+fault.c_id));
        }
        function saveUser(fault){
        	console.log(fault);
        	$.param(fault);
        	return $http.post('http://localhost:9299/powerapi/rest/angular/saveUser?'+$.param(fault), fault)
			.then(handleSuccess, handleError('Error getting Creating User with name:'+fault.username));
        }

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