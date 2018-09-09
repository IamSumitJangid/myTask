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
	__webpack_require__(7);
	module.exports = __webpack_require__(8);


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
	            $urlRouterProvider.otherwise('/home/pokemons');
	            $stateProvider
	                .state('home', {
	                    url: '/home',
	                    template:'<section layout="row" flex style="min-height:500px;" ng-cloak><div layout="column" flex><md-toolbar md-whiteframe="6" class="header-fixed site-content-toolbar _md _md-toolbar-transitions" aria-hidden="false"><md-progress-linear class="top_loading" ng-if="loading" md-mode="indeterminate"></md-progress-linear><div class="row"><div class="col-xs-8 col-sm-10 col-md-11"><div class="md-toolbar-tools docs-toolbar-tools" tabindex="-1"><a ui-sref="home.pokemons">Pokemons</a></div></div><div class="col-xs-4 col-sm-2 col-md-1"><div class="md-toolbar-tools docs-toolbar-tools" tabindex="-1"><a href="https://github.com/IamSumitJangid/myTask" class="pull-left" target="_blank">Github</a></div></div></div></md-toolbar><md-content class="content" flex layout-padding><ui-view></ui-view></md-content></div></section>',
	                    controller: 'HomeController as homeCtrl',
	                    data: { pageTitle: 'Pokemon Directory : Home' }
	                })
	                .state('home.pokemons', {
	                    url: '/pokemons',
	                    template:'<div layout="column" flex><div flex layout="row"><div flex><md-input-container md-no-float class="md-block"><input ng-model="pokemonCtrl.search" type="search" placeholder="search"></md-input-container></div></div><div ng-if="!pokemonCtrl.showLoading" flex><md-grid-list md-cols-xs="2" md-cols-sm="4" md-cols-md="6" md-cols-gt-md="8" md-row-height-gt-md="4:1" md-row-height-gt-sm="4:1" md-row-height-gt-xs="2:2" md-row-height="2:2" md-gutter="12px" md-gutter-gt-sm="8px"><md-grid-tile md-ink-ripple="#FF0000" hover-on-mouse ng-random-class md-whiteframe="2" md-rowspan="5" md-colspan="2" md-colspan-sm="2" md-rowspan-sm="2" md-colspan-xs="1" md-rowspan-xs="1" ng-click="pokemonCtrl.showDetails($event, item.url)" ng-repeat="item in pokemonCtrl.pokemonsData.results | filter : pokemonCtrl.search"><label class="badge badge-success">#{{item.rank}}</label> <img ng-src="images/pokemon/{{item.imageNumber}}.png" style="max-height: 120px" class="img img-responsive"><md-grid-tile-footer><h3><b>{{item.name | uppercase}}</b></h3></md-grid-tile-footer></md-grid-tile></md-grid-list></div><div ng-if="pokemonCtrl.showLoading" class="loading" flex><h1 class="text-center">Loading...</h1></div><br><div flex ng-if="pokemonCtrl.pokemonsData.results"><section layout="row"><div flex><md-button class="md-primary md-hue-1" ng-disabled="!pokemonCtrl.pokemonsData.previous" ng-click="pokemonCtrl.moveToPrevious(pokemonCtrl.pokemonsData.previous)">Previous</md-button></div><div flex><center ng-if="!pokemonCtrl.search || !pokemonCtrl.showLoading"><p class="resultInfo">{{pokemonCtrl.showingReasult}}</p></center></div><div flex><md-button class="pull-right md-primary md-hue-1" ng-disabled="!pokemonCtrl.pokemonsData.next" ng-click="pokemonCtrl.moveToNext(pokemonCtrl.pokemonsData.next)">Next</md-button></div></section></div></div>',
	                    controller: 'PokemonController as pokemonCtrl',
	                    data: { pageTitle: 'Pokemon Directory : Pokemons' }
	                });
	        }])
	        .filter('getidbyurl', function() {
	            return function(string, pattern) {
	                return string.split(pattern)[1].replace("\/", "");
	            }
	        });

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

	(function() {

	    'use strict';

	    angular.module('PokemonDirectory')
	        .directive("ngRandomClass", function() {
	            return {
	                restrict: 'A',
	                replace: false,
	                link: function(scope, elem, attr) {
	                    var classes = [
	                        "gray",
	                        "green",
	                        "yellow",
	                        "blue",
	                        "red",
	                        "purple"
	                    ];
	                    elem.addClass(classes[Math.floor(Math.random() * (classes.length))]);
	                }
	            }
	        })
	        .directive('hoverOnMouse', function(){
	            return {
	                restrict: 'A',
	                link: function($scope, iElm, iAttrs) {
	                    iElm[0].onmouseenter = function (argument) {
	                       iElm.addClass('md-whiteframe-6dp');
	                    }

	                    iElm[0].onmouseleave = function (argument) {
	                         // iElm.attr('md-whiteframe',2);
	                        iElm.removeClass('md-whiteframe-6dp');
	                    }
	                }
	            };
	        });

	})();

/***/ }),
/* 4 */
/***/ (function(module, exports) {

	(function (){
	  'use strict';
	  angular.module('Home', []);
	})();

/***/ }),
/* 5 */
/***/ (function(module, exports) {

	(function() {

	    'use strict';

	    angular.module('Home')
	    .controller('HomeController', ['$scope', '$state', function($scope, $state) {
	        var homeCtrl = this;
	    }]);
	})();

/***/ }),
/* 6 */
/***/ (function(module, exports) {

	(function() {
	    'use strict';

	    angular.module('Home')
	        .component('pokemonDetailModal', {
	            template:'<div aria-label="Pokemon"><form ng-cloak><md-toolbar><div class="md-toolbar-tools"><h2>pokemon Deatails</h2><span flex></span><md-button class="md-icon-button" ng-click="cancel()">X</md-button></div></md-toolbar><md-dialog-content><div class="md-dialog-content" style="width: 100%;"><div ng-if="$ctrl.isFetching" class="loading"><h2>Loading...</h2></div><div ng-if="!$ctrl.isFetching"><h2>#{{$ctrl.pokemonDetail.id}} {{$ctrl.pokemonDetail.name | uppercase}}</h2><div class="row"><div class="col-xs-12 col-sm-4"><div flex><img ng-src="images/pokemon/{{$ctrl.pokemonDetail.id}}.png" style="max-height: 120px" class="img img-responsive center-block"></div><div flex layout="row" layout-xs="row" class="type"><div flex class="monster-type type1">{{$ctrl.pokemonDetail.types[1].type.name | uppercase}}</div>&nbsp;<div flex class="monster-type type2">{{$ctrl.pokemonDetail.types[0].type.name | uppercase}}</div></div></div><div class="col-xs-12 col-sm-8"><div class="row" ng-repeat="state in $ctrl.pokemonDetail.stats"><div class="col-xs-12 col-sm-4" nowrap>{{state.stat.name}}</div><div class="col-xs-12 col-sm-8"><div class="progress"><div style="width: {{state.base_stat}}%;">&nbsp;{{state.base_stat}}</div></div></div></div></div></div><md-divider></md-divider><div flex layout="column"><h4>Profile</h4><div class="row"><div class="col-xs-6 col-sm-4">Height :</div><div class="col-xs-6 col-sm-8">{{$ctrl.pokemonDetail.height/10 | number : 1}} m</div></div><div class="row"><div class="col-xs-6 col-sm-4">Weight :</div><div class="col-xs-6 col-sm-8">{{$ctrl.pokemonDetail.weight / 10 | number : 1}} Kg</div></div><div class="row"><div class="col-xs-6 col-sm-4">Abilities :</div><div class="col-xs-6 col-sm-8"><span ng-repeat="abi in $ctrl.pokemonDetail.abilities">{{abi.ability.name}} <span style="white-space: pre-line;" ng-if="$index != $first && !$last">,</span></span></div></div></div><md-divider></md-divider><div flex layout="column"><h4>Evaluation</h4><div class="row"><div class="col-xs-12 col-sm-4"><center><img ng-src="images/pokemon/{{$ctrl.pokemonDetail.id}}.png" style="max-height: 120px" class="img img-responsive center-block"> {{$ctrl.pokemonDetail.evalution.chain.species.name}}</center></div><div class="col-xs-12 col-sm-4"><center><h3>To</h3>At min level {{$ctrl.pokemonDetail.evalution.chain.evolves_to[0].evolution_details[0].min_level}}</center></div><div class="col-xs-12 col-sm-4"><center><img ng-src="images/pokemon/{{$ctrl.pokemonDetail.evalution.imageNo}}.png" style="max-height: 120px" class="img img-responsive center-block"> {{$ctrl.pokemonDetail.evalution.chain.evolves_to[0].species.name}}</center></div></div></div></div></div></md-dialog-content></form></div>',
	            bindings: {
	                url: '@',
	            },
	            controller: ctrlDialog
	        });


	    ctrlDialog.$inject = ['$scope', 'PokemonService', '$mdDialog', '$filter'];

	    function ctrlDialog($scope, PokemonService, $mdDialog, $filter) {
	        var $ctrl = this;


	        $ctrl.$onInit = function() {
	            console.log($ctrl);
	            $ctrl.isFetching = true;
	            PokemonService.getDetails($ctrl.url)
	                .then(response => {
	                    console.log(response);
	                    $ctrl.pokemonDetail= response.data;
	                    getEvolutionDetailsByUrl($ctrl.pokemonDetail);
	                    $ctrl.isFetching = false;
	                }, error => {
	                    console.log(error);
	                });
	        }

	        function getEvolutionDetailsByUrl(obj) {
	            var url = 'https://pokeapi.co/api/v2/evolution-chain/'+obj.id
	            PokemonService.get(url)
	            .then(response => {
	                    console.log(response);
	                    $ctrl.pokemonDetail.evalution = response.data;
	                    $ctrl.pokemonDetail.evalution.imageNo = $filter('getidbyurl')(response.data.chain.evolves_to[0].species.url, 'pokemon-species/');
	                }, error => {
	                    console.log(error);
	                });
	        }

	        $scope.cancel = function() {
	            $mdDialog.cancel();
	        };
	    }
	})();

/***/ }),
/* 7 */
/***/ (function(module, exports) {

	(function() {

	    'use strict';

	    angular.module('Home')
	        .controller('PokemonController', ['$rootScope', '$scope', 'PokemonService', '$mdDialog', '$filter', function($rootScope, $scope, PokemonService, $mdDialog, $filter) {
	            var pokemonCtrl = this;
	            pokemonCtrl.pokemonsData = {};
	            var apiUrl = 'https://pokeapi.co/api/v2/pokemon';

	            function settingImageUrl() {
	                angular.forEach(pokemonCtrl.pokemonsData.results, function(obj) {
	                    obj.imageNumber = $filter('getidbyurl')(obj.url, 'pokemon/');
	                    obj.rank = obj.imageNumber;
	                });
	            }


	            function currentViewPageInfo() {
	                var total = pokemonCtrl.pokemonsData.count;
	                var offset = pokemonCtrl.pokemonsData.next.split('&offset=')[1] - 20 + 1;
	                pokemonCtrl.showingReasult = "showing " + Number(offset) + " to " + (Number(offset) + 19) + " of total " + total;
	            }

	            function getPokemonsForGridView(url) {
	                pokemonCtrl.showLoading = true;
	                $rootScope.loading = true;
	                PokemonService.getPokemons(url)
	                    .then(response => {
	                        pokemonCtrl.pokemonsData = response.data;
	                        settingImageUrl();
	                        currentViewPageInfo();
	                        pokemonCtrl.showLoading = false;
	                        $rootScope.loading = false;
	                    }, error => {
	                        console.log(error);
	                    });
	            }

	            getPokemonsForGridView(apiUrl);

	            pokemonCtrl.showDetails = function(ev, url) {
	                var template = '<pokemon-detail-modal url=' + url + '></pokemon-detail-modal>'
	                $mdDialog.show({
	                    template: template,
	                    parent: angular.element(document.body),
	                    targetEvent: ev,
	                    clickOutsideToClose: true,
	                    fullscreen: $scope.customFullscreen // Only for -xs, -sm breakpoints.
	                });
	            };

	            pokemonCtrl.moveToNext = function(url) {
	                getPokemonsForGridView(url);
	            }

	            pokemonCtrl.moveToPrevious = function(url) {
	                getPokemonsForGridView(url);
	            }
	        }]);
	})();

/***/ }),
/* 8 */
/***/ (function(module, exports) {

	(function() {
	    'use strict';

	    angular.module('Home')
	        .service('PokemonService', ['$http', function($http) {
	            var service = this;
	            
	            service.getPokemons = function(url) {
	                return $http({
	                    method: "GET",
	                    url: 'api/pokemons.json'
	                });
	            }

	            service.getDetails = function(url) {
	                return $http({
	                    method: "GET",
	                    url: 'api/detail.json'
	                });
	            }


	            service.get = function(url) {
	                return $http({
	                    method: "GET",
	                    url: 'api/evolution.json'
	                });
	            }

	        }]);
	})();

/***/ })
/******/ ]);