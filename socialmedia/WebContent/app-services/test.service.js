(function () {
    'use strict';

    angular
        .module('app')
        .factory('TestService', TestService);

    TestService.$inject = ['$http'];
    function TestService($http) {
        var service = {};

        service.GetById = GetById;
        service.GetAll = GetAll;
        service.GetAllUsers = GetAllUsers;
        service.updateTest = updateTest;


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
        function updateTest(obj) {
        	console.log(obj.score);
        	var test=$.param(obj.obj);
        	test=test+'&score='+obj.score;
        	console.log(test);
            return $http.post('http://localhost:9299/powerapi/rest/angular/test/insert?'+test)
  			.then(handleSuccess, handleError('Error getting all users'));
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