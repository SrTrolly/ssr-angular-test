const TOTAL_POKEMONS = 10;
const TOTAL_PAGES = 5;

(async () => {

    const fs = require('fs');

    const pokemonsIds = Array.from({ length: TOTAL_POKEMONS }, (_, i) => i + 1);
    const pagePokemons = Array.from({ length: TOTAL_PAGES }, (_, i) => i + 1);

    const pathContent = pagePokemons.map(numPage => `/pokemons/page/${numPage}`).join('\n');
    let fileContent = pokemonsIds.map(id => `/pokemons/${id}`).join('\n');

    fileContent = fileContent.concat(`\n${pathContent}`);

    //Nombres de pokemons
    const pokemonNamelist = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${TOTAL_POKEMONS}`).then(res => res.json());

    fileContent += '\n';
    fileContent += pokemonNamelist.results.map(pokemon => `/pokemons/${pokemon.name}`).join('\n');

    fs.writeFileSync('routes.txt', fileContent);

    console.log('Routes.txt Generated');

})();