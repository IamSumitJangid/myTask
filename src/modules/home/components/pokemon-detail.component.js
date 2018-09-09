(function() {
    'use strict';

    angular.module('Home')
        .component('pokemonDetailModal', {
            templateUrl: 'src/modules/home/views/pokemon-details.template.html',
            bindings: {
                url: '@',
            },
            controller: ctrlDialog
        });


    ctrlDialog.$inject = ['$scope', 'PokemonService', '$mdDialog'];

    function ctrlDialog($scope, PokemonService, $mdDialog) {
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
                    $ctrl.pokemonDetail.evalution.imageNo = response.data.chain.evolves_to[0].species.url.split('pokemon-species/')[1].replace("\/", "");
                }, error => {
                    console.log(error);
                });
        }

        $scope.cancel = function() {
            $mdDialog.cancel();
        };
    }
})();