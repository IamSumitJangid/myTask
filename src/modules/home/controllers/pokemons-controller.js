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