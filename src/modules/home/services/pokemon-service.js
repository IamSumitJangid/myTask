(function() {
    'use strict';

    angular.module('Home')
        .service('PokemonService', ['$http', function($http) {
            var service = this;
            
            service.get = function(url) {
                return $http({
                    method: "GET",
                    url: url
                });
            }

            // service.getDetails = function(url) {
            //     return $http({
            //         method: "GET",
            //         url: 'api/detail.json'
            //     });
            // }


            // service.get = function(url) {
            //     return $http({
            //         method: "GET",
            //         url: 'api/evolution.json'
            //     });
            // }

        }]);
})();