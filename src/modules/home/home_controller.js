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