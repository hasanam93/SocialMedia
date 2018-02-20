(function () {
    'use strict';

    angular
        .module('app')
        .controller('ProjectsController', ProjectsController);

    ProjectsController.$inject = ['ProjectsService', '$rootScope'];
    function ProjectsController(ProjectsService, $rootScope) {
        var vm = this;

        vm.user = null;
        vm.fault=null;
        vm.course=null;
        vm.classes=[];
        vm.feePaid=null;
        vm.userClasses=[];
        /*vm.canLogin=false;*/
        vm.allFaults = [];
        vm.loadFault = loadFault;
        vm.updateFault = updateFault;
        vm.createUser = createUser;
        vm.saveUser = saveUser;
        vm.addCourse = addCourse;
        vm.insertCourse = insertCourse;
        vm.reset = reset;
        vm.submit = submit;
        vm.cancle = cancle;
        vm.updateCanLogin = updateCanLogin;
        vm.loadAllclasses = loadAllclasses;
        vm.getPhoto = getPhoto;

        initController();

        function initController() {
        	showList();
            loadAllFaults();
        }
        function cancle() {
        	//console.log('cancle');
        	showList();
         }
        function getPhoto() {
        	console.log('kkk');
        }

        function updateCanLogin(obj) {
        	/*vm.fault.canLogin=canLogin;*/
        }
        function loadAllFaults() {
        	ProjectsService.GetAll()
                .then(function (users) {
                    vm.allFaults = users.recs;
                  //  console.log(vm.allFaults);
                });
        }
        function loadAllclasses() {
        	ProjectsService.loadAllclasses()
                .then(function (obj) {
                    vm.classes = obj.recs;
                  //  console.log(vm.allFaults);
                });
        }

        function createUser(){
    		reset();
    		loadAllclasses();
    		showFrom();
    		console.log('lll');
        };
        function saveUser(){
       	 console.log(vm.fault);
       	 vm.fault.course=vm.course;
       	ProjectsService.saveUser(vm.fault)
        .then(function (users) {
            vm.allFaults = users.faults;
        });
       	showList();
       };
       function addCourse(obj){
         	vm.fault=obj;
         	console.log(vm.fault);
         	loadAllclasses();
         	console.log(vm.classes);
         	console.log('addCourse');
         	showassignCourse();
         };
         function insertCourse(obj, id){
        	 alert();
        	 if(obj.feePaid==null || obj.feePaid==''){
        		 alert('Please Input Fee Paid.');
        	 }else{
        		 var course={
        	        		'feepaid':obj.feePaid,
        	        		c_id:obj.f.id,
        	        		s_id:id
        	        	 };
        	 console.log(obj);
        	 console.log(course);
         	 console.log('insertCourse');
        	 }
         };

        function loadFault(id) {
        	  for(var i = 0; i < vm.allFaults.length; i++){
                  if(vm.allFaults[i].id == id) {
                	  vm.fault = angular.copy(vm.allFaults[i]);
                     break;
                  }
              }
        	  showFrom();
        }
        function updateFault(fault) {
        	ProjectsService.updateFault(fault)
            .then(function () {
                loadAllFaults();
            });
        	//FlashService.Success('Record Updated Successfully');
        	showFrom();
        }

        function reset(){
        	vm.fault={id:0,username:'',address:'',mail:'',course:'',qlf:'',};
        	//$rootScope.myForm.$setPristine(); //reset Form
        };
        function showList(){
        	$rootScope.userList=true;
         	$rootScope.createUser=false;
         	$rootScope.assignCourse=false;
        };
        function showassignCourse(){
        	$rootScope.assignCourse=true;
        	$rootScope.userList=false;
         	$rootScope.createUser=false;
        };
        function showFrom(){
        	$rootScope.createUser=true;
        	$rootScope.userList=false;
        	$rootScope.assignCourse=false;
        };
        function submit(){
        	if(vm.fault.c_id==null){
                console.log('Saving New User', vm.fault);
                vm.saveUser(vm.fault);
            }else{
            	//vm.updateUser(vm.fault, vm.fault.c_id);
            	console.log('Fault updated is: ', vm.fault);
                updateFault(vm.fault);
            }
        	vm.reset();
        };
    }

})();