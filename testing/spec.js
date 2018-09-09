describe('Filters', function(){ //describe your object type
    beforeEach(module('PokemonDirectory')); //load module
    describe('getidbyurl',function(){ //describe your app name
        var getidbyurl;
        beforeEach(inject(function($filter){ //initialize your filter
            getidbyurl = $filter('getidbyurl',{});
        }));
        it('Should return a id', function(){  //write tests
            expect(getidbyurl('https://pokeapi.co/api/v2/pokemon/2/', 'pokemon/')).toBe('2'); //pass
            expect(getidbyurl('https://pokeapi.co/api/v2/pokemon-species/1/', 'pokemon-species/')).toBe('1'); //pass
            expect(getidbyurl('https://pokeapi.co/api/v2/pokemon/2/', 'pokemon/')).toBe('oops'); // this test should fail
        });
    });
});