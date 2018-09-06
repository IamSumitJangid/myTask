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
	                    template:'<ui-view></ui-view>',
	                    controller: 'HomeController as homeCtrl',
	                    resolve: {
	                        pokemons: ['PokemonService', function(PokemonService) {
	                            return PokemonService.getPokemons();
	                        }]
	                    },
	                    data: { pageTitle: 'Pokemon Directory : Home' }
	                })
	                .state('home.pokemons', {
	                    url: '/pokemons',
	                    template:'<md-card md-whiteframe="2"></md-card>',
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
	                    config.headers['Content-Type'] = 'application/json';
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

	    angular.module('Home').controller('HomeController', HomeController);

	    HomeController.$inject = ['$scope', '$cookies', '$state', 'pokemons'];

	    function HomeController($scope, $cookies, $state, pokemons) {
	        var homeCtrl = this;
	        console.log(pokemons);
	        homeCtrl.pokemons = pokemons.data;
	        
	    }
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
	    .controller('PokemonsController', ['$scope', function($scope) {
	        var pokemonCtrl = this;
	    }]);
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

	            service.getPokemons = function() {
	                return $http({
	                    method: "GET",
	                    url: URL + "pokemon"
	                });
	            }
	        }]);
	})();

/***/ })
/******/ ]);