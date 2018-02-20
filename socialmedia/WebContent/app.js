(function () {
    'use strict';
    angular
        .module('app', ['ngRoute', 'ngCookies'])
        .config(config)
        .run(run);

    config.$inject = ['$routeProvider', '$locationProvider'];
    function config($routeProvider, $locationProvider) {
        $routeProvider
            .when('/', {
                controller: 'HomeController',
                templateUrl: 'home/home.view.html',
                controllerAs: 'vm'
            })
            .when('/login', {
                controller: 'LoginController',
                templateUrl: 'login/login.view.html',
                controllerAs: 'vm'
            })

            .when('/register', {
                controller: 'RegisterController',
                templateUrl: 'register/register.view.html',
                controllerAs: 'vm'
            })

            .when('/projects', {
                controller: 'ProjectsController',
                templateUrl: 'projects/projects.view.html',
                controllerAs: 'vm'
            })
            .when('/attendance', {
                controller: 'AttendanceController',
                templateUrl: 'attendance/attendance.view.html',
                controllerAs: 'vm'
            })
            .when('/test', {
                controller: 'TestController',
                templateUrl: 'test/test.view.html',
                controllerAs: 'vm'
            })
            .when('/systemdateoverride', {
                controller: 'SystemDateOverrideController',
                templateUrl: 'systemdateoverride/systemoverride.view.html',
                controllerAs: 'vm'
            })
            .when('/courses', {
                controller: 'CourseController',
                templateUrl: 'course/course.view.html',
                controllerAs: 'vm'
            })
            /* .when('/project/fault.id', {
                controller: 'ProjectsController',
                templateUrl: 'projects/fault.view.html',
                controllerAs: 'vm',
                resolve: {
                    async: ['ProjectsController', '$stateParams', function(ProjectsController, $stateParams) {
                        return ProjectsController.loadFault($stateParams.c_id);
                   	}]
                }
            })*/

            .otherwise({ redirectTo: '/login' });
    }

    run.$inject = ['$rootScope', '$location', '$cookieStore', '$http'];
    function run($rootScope, $location, $cookieStore, $http) {
        // keep user logged in after page refresh
        $rootScope.globals = $cookieStore.get('globals') || {};
        if ($rootScope.globals.currentUser) {
        	$http.defaults.useXDomain = true;
        	$http.defaults.withCredentials = false;
        	delete $http.defaults.headers.common["X-Requested-With"];
        	$http.defaults.headers.common["Content-Type"] = "application/json";
            //$http.defaults.headers.common['Authorization'] = 'Basic ' + $rootScope.globals.currentUser.authdata; // jshint ignore:line
        }

        $rootScope.$on('$locationChangeStart', function (event, next, current) {
            // redirect to login page if not logged in and trying to access a restricted page
            var restrictedPage = $.inArray($location.path(), ['/login', '/register']) === -1;
            var loggedIn = $rootScope.globals.currentUser;
            if (restrictedPage && !loggedIn) {
                $location.path('/login');
            }
        });
    }

})();