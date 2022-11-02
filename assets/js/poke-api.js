const pokeApi = {}

function convertPokeApiToDetailToPokemon(pokeDetail){
    const pokemon = new Pokemon();
    pokemon.number = pokeDetail.id;
    pokemon.name = pokeDetail.name;
    const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name);
    pokemon.types = types;
    pokemon.principal_type = types[0];
    pokemon.photo = pokeDetail.sprites.other.dream_world.front_default;

    return pokemon
}

pokeApi.getPokemonDetail = (pokemon) =>{
    return fetch(pokemon.url)
    .then((response) => response.json())
    .then(convertPokeApiToDetailToPokemon)//pega o resultado do JSON, atribui ao objeto e depois retorna o objeto
}

pokeApi.getPokemons = (offset = 0, limit = 10) => {

    const url = `https://pokeapi.co/api/v2/pokemon/?offset=${offset}&limit=${limit}"`;
    return fetch(url)
        .then((response) => response.json()) //faz a requisicao

        .then((jsonBody) => jsonBody.results) //converte o resultado para ter acesso ao body

        .then((pokemons) => pokemons.map(pokeApi.getPokemonDetail)) //O map passa todos os pokemons como parametro para o fetch que passa como parametro a url pokemon que é transformada em JSON
        
        .then((detailRequests) => Promise.all(detailRequests)) //recebe a lista de promessas e com o promise.all espera a lista responder

        .then((pokemonDetails) => pokemonDetails) //Retorna a lista de detalhes e chama a função getPokemonDetail

        .catch((error) => console.log(error)) //caso ocorra algum erro
}