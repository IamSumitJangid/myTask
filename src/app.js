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
                    templateUrl: 'src/modules/home/views/home.html',
                    controller: 'HomeController as homeCtrl',
                    data: { pageTitle: 'Pokemon Directory : Home' }
                })
                .state('home.pokemons', {
                    url: '/pokemons',
                    templateUrl: 'src/modules/home/views/pokemons.html',
                    controller: 'PokemonController as pokemonCtrl',
                    data: { pageTitle: 'Pokemon Directory : Pokemons' }
                });
        }])

})();