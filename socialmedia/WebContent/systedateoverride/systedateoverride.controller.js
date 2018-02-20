(function () {
    'use strict';

    angular
        .module('app')
        .controller('SystedateOverrideController', SystedateOverrideController);

    SystedateOverrideController.$inject = ['TestService', '$rootScope', '$scope'];
    function SystedateOverrideController(TestService, $rootScope, $scope) {
        var vm = this;

        vm.obj = null;
        vm.cls = null;
      
        vm.update=update;
        vm.reset = reset;
        vm.submit = submit;
        vm.cancle=cancle;

        initController();

        function initController() {
        	//loadAllobj();
        	console.log("test")
        	console.log($scope)
        	console.log($rootScope)
        }

       
        function updateScore(obj) {
        	console.log(obj.obj);
        	TestService.updateTest(obj)
            .then(function (result) {
               console.log(result);
            });
        }
        function update(obj) {
        	console.log(obj);
            loadAllUsers(obj.cls);
        }
       function reset(){
        	vm.obj={id:null,username:'',phone:'',email:'',qstn:'',option:'',ans:''};
        };
        function submit(){
        	console.log('kk');
        	console.log($rootScope);
        	$rootScope.globals=vm.obj;
        	console.log($rootScope);
        	
        };
        function cancle(){
        	$rootScope.showLogin=false;
        };
    }

})();