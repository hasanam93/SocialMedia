(function () {
    'use strict';

    angular
        .module('app')
        .controller('TestController', TestController);

    TestController.$inject = ['TestService', '$rootScope'];
    function TestController(TestService, $rootScope) {
        var vm = this;

        vm.obj = null;
        vm.cls = null;
        vm.classes=[];
        vm.allobj=[];
        vm.scores=null;
        vm.scores=[{'id':'1','text':'Satisfactory'},{'id':'2','text':'Good'},{'id':'3','text':'Better'},{'id':'4','text':'Best'}];
        vm.loadAllobj = loadAllobj;
        vm.loadAllUsers = loadAllUsers;
        vm.loadObj=loadObj;
        vm.updateScore=updateScore;
        vm.update=update;
        vm.reset = reset;
        vm.submit = submit;
        vm.cancle=cancle;

        initController();

        function initController() {
        	loadAllobj();
        }

        function loadAllobj() {
        	TestService.GetAll()
                .then(function (obj) {
                    vm.classes = obj.recs;
                });
        }
        function loadAllUsers(cls) {
        	TestService.GetAllUsers(cls)
                .then(function (obj) {
                    vm.allobj = obj.recs;
                    console.log(vm.allobj);
                });
        }
        function loadObj(obj) {
        	console.log(obj);
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
        	if(vm.obj.id==null){
                console.log('Saving New Attendance', vm.obj);
            }else{
            	console.log('attendance updated is: ', vm.obj);
                updateObj(vm.obj);
            }
        	vm.reset();
        };
        function cancle(){
        	$rootScope.showLogin=false;
        };
    }

})();