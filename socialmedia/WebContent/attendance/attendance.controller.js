(function () {
    'use strict';

    angular
        .module('app')
        .controller('AttendanceController', AttendanceController);

    AttendanceController.$inject = ['AttendanceService', '$rootScope','FlashService'];
    function AttendanceController(AttendanceService, $rootScope, FlashService) {
        var vm = this;

        vm.obj = null;
        vm.cls = null;
        vm.isPr=null;
        vm.allobj = [];
        vm.classes=[];
        vm.loadAllobj = loadAllobj;
        vm.loadObj = loadObj;
        vm.updateObj = updateObj;
        vm.update=update;
        vm.stateChanged=stateChanged;
        vm.loadAllclasses=loadAllclasses;


        vm.reset = reset;
        vm.submit = submit;
        vm.cancle=cancle;

        initController();

        function initController() {
            loadAllclasses();
        }

        function loadAllclasses() {
        	AttendanceService.GetAll()
                .then(function (obj) {
                    vm.classes = obj.recs;
                  //  console.log(vm.allFaults);
                });
        }
        function loadAllobj(cls) {
        	AttendanceService.GetAllUsers(cls)
                .then(function (obj) {
                    vm.allobj = obj.recs;
                  //  console.log(vm.allFaults);
                });
        }
        function update(obj) {
        	//console.log(obj.cls);
            loadAllobj(obj.cls);
        }
        function stateChanged(obj) {
        	AttendanceService.stateChanged(obj);
            //loadAllobj(obj.cls);
        }


        function loadObj(id) {
        	console.log(id);
        	  for(var i = 0; i < vm.allobj.length; i++){
                  if(vm.allobj[i].id == id) {
                	  vm.obj = angular.copy(vm.allobj[i]);
                     break;
                  }
              }
        	  console.log(vm.obj);
        	  $rootScope.showLogin=true;
        }
        function updateObj(obj) {
        	AttendanceService.updateObj(obj)
            .then(function (response) {
//            	loadAllobj();
            	console.log(response);
            	FlashService.Error(response.reason);
            });
        	$rootScope.showLogin=false;
        }

       function reset(){
        	vm.cals={id:null,username:'',phone:'',email:''};
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