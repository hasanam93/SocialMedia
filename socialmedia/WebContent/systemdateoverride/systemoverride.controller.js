(function () {
    'use strict';

    angular
        .module('app')
        .controller('SystemDateOverrideController', SystemDateOverrideController);

    SystemDateOverrideController.$inject = ['TestService', '$rootScope'];
    function SystemDateOverrideController(TestService, $rootScope) {
        var vm = this;

        vm.obj = null;
        vm.date=null;
       
        vm.update=update;
        vm.reset = reset;
        vm.submit = submit;
        vm.cancle=cancle;

        initController();

        function initController() {
        	vm.date=$rootScope.date;
        }

        
        function update(obj) {
        	console.log(obj);
        }
       function reset(){
        	vm.obj={id:null,username:'',phone:'',email:'',qstn:'',option:'',ans:''};
        };
        function submit(){
        	console.log('kk');
        	console.log(vm.obj);
        	$rootScope.date=vm.obj.date;
        	vm.date=vm.obj.date;
        	if(vm.obj.id==null){
                console.log('Saving New Attendance', vm.obj);
            }else{
            	console.log('attendance updated is: ', vm.obj);
                //updateObj(vm.obj);
            }
        	vm.reset();
        };
        function cancle(){
        	$rootScope.showLogin=false;
        };
    }

})();