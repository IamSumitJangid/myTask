(function() {

    'use strict';

    angular.module('Home')
        .controller('PokemonController', ['$rootScope', '$scope', 'PokemonService', '$mdDialog', function($rootScope, $scope, PokemonService, $mdDialog) {
            var pokemonCtrl = this;
            pokemonCtrl.pokemonsData = {};
            var apiUrl = 'https://pokeapi.co/api/v2/pokemon';
            function settingImageUrl() {
                angular.forEach(pokemonCtrl.pokemonsData.results, function(obj) {
                    obj.imageNumber = obj.url.split('pokemon/')[1].replace("\/", "");
                });
            }


            function currentViewPageInfo() {
                var total = pokemonCtrl.pokemonsData.count;
                var offset = pokemonCtrl.pokemonsData.next.split('&offset=')[1] - 20 + 1;
                pokemonCtrl.showingReasult = "showing "+ Number(offset) +" to " + (Number(offset) + 19) + " of total "+ total;
            }

            function getPokemonsForGridView(url) {
                PokemonService.getPokemons(url)
                    .then(response => {
                        pokemonCtrl.pokemonsData = response.data;
                        settingImageUrl();
                        currentViewPageInfo();
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

            pokemonCtrl.moveToNext = function (url) {
                getPokemonsForGridView(url);
            }

            pokemonCtrl.moveToPrevious = function (url) {
                getPokemonsForGridView(url);
            }



        }]);
})();