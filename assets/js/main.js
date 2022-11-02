const pokemonList =  document.getElementById('pokemonList');
const loadMoreButton = document.getElementById('loadMoreButton');
const maxRecords = 151;
const limit = 5;
let offset = 0;


function loadPokemonItens(offset, limit){
    function convertPokemonToLi(pokemon) {
        return `
            <li class="pokemon ${pokemon.principal_type}">
                <span class="number">#${pokemon.number}</span>
                <span class="name">${pokemon.name}</span>
                <div class="detail">
                    <ol class="types">
                        ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join(" ")}
                    </ol>
                    <img src="${pokemon.photo}" alt="Imagem do pokemon ${pokemon.name}">
                </div>
            </li>
        `
    }
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {

       const newHtml= pokemons.map(convertPokemonToLi).join("");
        pokemonList.innerHTML += newHtml;

    })
    .finally(() => console.log('requisição concluída'))

}

loadPokemonItens(offset, limit);

loadMoreButton.addEventListener('click',()=> {
    offset+=limit;

    const qtdRecordNextPage = offset + limit;
 
    if(qtdRecordNextPage >= maxRecords){
        const newLimit = maxRecords - offset;
        loadPokemonItens(offset, newLimit);
        loadMoreButton.parentElement.removeChild(loadMoreButton);
    }else{
        loadPokemonItens(offset, limit);
    }


});