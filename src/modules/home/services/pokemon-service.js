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