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