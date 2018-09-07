/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

	__webpack_require__(1);
	__webpack_require__(2);
	__webpack_require__(3);
	__webpack_require__(4);
	__webpack_require__(5);
	__webpack_require__(6);
	module.exports = __webpack_require__(7);


/***/ }),
/* 1 */
/***/ (function(module, exports) {

	(function() {
	    'use strict';
	    angular.module('PokemonDirectory', ['ui.router', 'ngMaterial', 'ngMessages', 'Home'])
	        .config(['$httpProvider', function($httpProvider) {
	            $httpProvider.interceptors.push('requestInterceptor');
	        }])
	        .config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
	            $urlRouterProvider.otherwise('/home');
	            $stateProvider
	                .state('home', {
	                    url: '/home',
	                    template:'<section layout="row" flex><md-sidenav class="md-sidenav-left" md-component-id="left" md-is-locked-open="$mdMedia(\'gt-md\')" md-whiteframe="4"><md-toolbar class="md-theme-indigo"><h1 class="md-toolbar-tools">Pokemon</h1></md-toolbar><md-content layout-padding><md-button ng-click="close()" class="md-primary">Close Sidenav Left</md-button><p>This sidenav is locked open on your device. To go back to the default behavior, narrow your display.</p></md-content></md-sidenav><div layout-column flex><md-toolbar class="md-whiteframe-glow-z1 site-content-toolbar _md _md-toolbar-transitions"><div class="md-toolbar-tools docs-toolbar-tools" tabindex="-1">Directory</div></md-toolbar><md-content flex layout-padding><ui-view></ui-view></md-content></div></section>',
	                    controller: 'HomeController as homeCtrl',
	                    resolve: {
	                        pokemons: ['PokemonService', function(PokemonService) {
	                            return null;
	                        }]
	                    },
	                    data: { pageTitle: 'Pokemon Directory : Home' }
	                })
	                .state('home.pokemons', {
	                    url: '/pokemons',
	                    template:'<md-grid-list md-cols-xs="2" md-cols-sm="4" md-cols-md="4" md-cols-gt-md="6" md-row-height-gt-md="4:2" md-row-height="3:2" md-gutter="5px" md-gutter-gt-sm="4px"><md-grid-tile class="gray" md-rowspan="3" md-colspan="2" md-colspan-sm="1" md-colspan-xs="1" ng-repeat="item in pokemonCtrl.requestedData.results"><img ng-src="images/pokemon/{{$index+1}}.png"><md-grid-tile-footer><h3>{{item.name | uppercase}}</h3></md-grid-tile-footer></md-grid-tile></md-grid-list>',
	                    controller: 'PokemonController as pokemonCtrl',
	                    data: { pageTitle: 'Pokemon Directory : Pokemons' }
	                });
	        }])

	})();

/***/ }),
/* 2 */
/***/ (function(module, exports) {

	(function() {

	    'use strict';

	    angular.module('PokemonDirectory')
	        .factory('requestInterceptor', function($rootScope) {
	            return {
	                request: function(config) {
	                    config.headers = config.headers || {};
	                    config.headers['Access-Control-Allow-Origin'] = '*';
	                    config.headers['Access-Control-Allow-Methods'] = 'PUT, GET, POST';
	                    config.headers['Access-Control-Allow-Headers'] =
	                        'Origin, x-requested-with, Content-type';
	                    return config;
	                }

	            };
	        });
	})();

/***/ }),
/* 3 */
/***/ (function(module, exports) {

	(function (){
	  'use strict';
	  angular.module('Home', []);
	})();

/***/ }),
/* 4 */
/***/ (function(module, exports) {

	(function() {

	    'use strict';

	    angular.module('Home')
	    .controller('HomeController', ['$scope', '$state', '$timeout', '$mdSidenav', '$log', function($scope, $state,$timeout, $mdSidenav, $log) {
	            var homeCtrl = this;

	            $scope.toggleLeft = buildDelayedToggler('left');
	            $scope.toggleRight = buildToggler('right');
	            $scope.isOpenRight = function() {
	                return $mdSidenav('right').isOpen();
	            };

	            /**
	             * Supplies a function that will continue to operate until the
	             * time is up.
	             */
	            function debounce(func, wait, context) {
	                var timer;

	                return function debounced() {
	                    var context = $scope,
	                        args = Array.prototype.slice.call(arguments);
	                    $timeout.cancel(timer);
	                    timer = $timeout(function() {
	                        timer = undefined;
	                        func.apply(context, args);
	                    }, wait || 10);
	                };
	            }

	            /**
	             * Build handler to open/close a SideNav; when animation finishes
	             * report completion in console
	             */
	            function buildDelayedToggler(navID) {
	                return debounce(function() {
	                    // Component lookup should always be available since we are not using `ng-if`
	                    $mdSidenav(navID)
	                        .toggle()
	                        .then(function() {
	                            $log.debug("toggle " + navID + " is done");
	                        });
	                }, 200);
	            }

	            function buildToggler(navID) {
	                return function() {
	                    // Component lookup should always be available since we are not using `ng-if`
	                    $mdSidenav(navID)
	                        .toggle()
	                        .then(function() {
	                            $log.debug("toggle " + navID + " is done");
	                        });
	                };
	            }

	        }]);
	})();

/***/ }),
/* 5 */
/***/ (function(module, exports) {

	(function() {

	    'use strict';

	    angular.module('Home').controller('AllDoctorsController', AllDoctorsController);
	    AllDoctorsController.$inject = ['$scope', '$state', 'listDoctors'];

	    function AllDoctorsController($scope, $state, listDoctors) {
	        var allDoctorsCtrl = this;
	        allDoctorsCtrl.listDoctors = listDoctors.data;
	        console.log(listDoctors);
	        allDoctorsCtrl.actionList = ['TimeSlot', 'Update', 'Delete'];
	        
	        allDoctorsCtrl.addNew = function () {
	        	$state.go('home.add Update Doctor', {action: 'Add', id: -1});
	        }

	        allDoctorsCtrl.actionClick = function(actionName, objDoctor) {
	        	if(actionName == 'TimeSlot') {
	        		$state.go('home.getTimeslot', {id: objDoctor.doctorId});
	        	} else if (actionName == 'Update') {
	        		$state.go('home.add Update Doctor', {action: actionName, id: objDoctor.doctorId});
	        	} else if (actionName == 'Delete') {

	        	} else {
	        		alert("Unknown Action");
	        	}
	        }

	        // to sort table
	        $scope.sortTable = function (order) {
	        	$scope.sort = order;
	        }

	    }
	})();

/***/ }),
/* 6 */
/***/ (function(module, exports) {

	(function() {
	    'use strict';

	    angular.module('Home')
	        .controller('PokemonController', ['$scope', 'PokemonService', function($scope, PokemonService) {
	            var pokemonCtrl = this;
	            console.log(pokemonCtrl);



	            PokemonService.getPokemons()
	                .then(
	                    response => {
	                        pokemonCtrl.requestedData = response.data
	                    }, error => {
	                        console.log(error)
	                    }
	                );
	        }])
	})();

/***/ }),
/* 7 */
/***/ (function(module, exports) {

	(function() {
	    'use strict';

	    angular.module('Home')
	        .service('PokemonService', ['$http', function($http) {
	            var service = this;
	            var URL = 'http://pokeapi.co/api/v2/';
	            var url = 'api/pokemons.json'

	            service.getPokemons = function() {
	                return $http({
	                    method: "GET",
	                    // url: URL + "pokemon/"
	                    url: url
	                });
	            }
	        }]);
	})();

/***/ })
/******/ ]);