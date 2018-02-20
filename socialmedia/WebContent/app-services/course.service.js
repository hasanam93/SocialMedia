(function () {
    'use strict';

    angular
        .module('app')
        .factory('CourseService', CourseService);

    CourseService.$inject = ['$http'];
    function CourseService($http) {
        var service = {};

        service.GetById = GetById;
        service.GetAll = GetAll;
        service.GetAllUsers = GetAllUsers;
        service.updateObj = updateObj;


        return service;

        function GetAll() {
            return $http.post('http://localhost:9299/powerapi/rest/chat/users')
  			.then(handleSuccess, handleError('Error getting all users'));
          }
        function GetById(id) {
        	return $http.post('http://localhost:9299/powerapi/rest/chat/users')
  			.then(handleSuccess, handleError('Error getting all users'));
        }
        function GetAllUsers(id) {
            return $http.post('http://localhost:9299/powerapi/rest/chat/'+id)
  			.then(handleSuccess, handleError('Error getting all users'));
          }
        function updateObj(obj) {
        	console.log(obj);
        	var result = $.param(obj);
        	return $http.post('http://localhost:9299/powerapi/rest/course/update/'+obj.id+'?'+result, obj)
			.then(handleSuccess, handleError('Error getting while updating fault with id:'+obj.id));
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