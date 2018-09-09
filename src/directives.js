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