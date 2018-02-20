(function () {
    'use strict';

    angular
        .module('app')
        .controller('CourseController', CourseController);

    CourseController.$inject = ['CourseService', '$rootScope'];
    function CourseController(CourseService, $rootScope) {
        var vm = this;

        vm.obj = null;
        vm.cls = null;
        vm.classes=[];
        vm.allobj=[];

        vm.loadAllobj = loadAllobj;
        vm.createUser = createUser;
        vm.update=update;
        vm.loadObj=loadObj;

        vm.reset = reset;
        vm.submit = submit;
        vm.cancle=cancle;

        initController();

        function initController() {
        	$rootScope.userList=true;
        	loadAllobj();
        }

        function loadAllobj() {
        	CourseService.GetAll()
                .then(function (obj) {
                    vm.classes = obj.recs;
                });
        }
        function createUser(){
       	 console.log('lll');
       	 $rootScope.showLogin=true;
       	 $rootScope.userList=false;
       };
       function loadObj(id) {
    	   console.log(id);
     	  for(var i = 0; i < vm.classes.length; i++){
               if(vm.classes[i].id == id) {
             	  vm.obj = angular.copy(vm.classes[i]);
                  break;
               }
           }
     	  $rootScope.showLogin=true;
     	  $rootScope.userList=false;
     	 // console.log(vm.fault);
     }
       function updateObj(obj) {
    	 CourseService.updateObj(obj)
        .then(function (response) {
        	initController();
        	console.log(response);
        });
    	$rootScope.showLogin=false;
    }

        function update(obj) {
        	console.log(obj);
            loadAllUsers(obj.cls);
        }
       function reset(){
        	vm.obj={id:null,c_name:'',fee:'',s_d:'',e_d:''};
        };
        function submit(){
        	console.log('kk');
        	if(vm.obj.id==null){
                console.log('Saving New Course', vm.obj);
            }else{
            	console.log('Course updated is: ', vm.obj);
                updateObj(vm.obj);
            }
        	vm.reset();
        };
        function cancle(){
        	$rootScope.showLogin=false;
        	$rootScope.userList=true;
        };
    }

})();