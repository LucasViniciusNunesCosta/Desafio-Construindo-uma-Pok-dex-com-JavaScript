let base = document.getElementById('base');

//numero do pokemon que sera apresentado
let pokemonNumber = 1;

function DetailPokemon(pokeDetail) {
    //criando objeto
    const pokemonDetail = new DetailsPokemon();

    //informacoes superiores
    pokemonDetail.name = pokeDetail.name;
    pokemonDetail.number = pokeDetail.id;
    const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name);
    pokemonDetail.types = types;

    //foto e fundo
    pokemonDetail.principal_type = types[0];
    pokemonDetail.image = pokeDetail.sprites.other.dream_world.front_default;

    //dados pokemon
    pokemonDetail.height = pokeDetail.height;
    pokemonDetail.weight = pokeDetail.weight;
    const abilities = pokeDetail.abilities.map((abilitySlot) => abilitySlot.ability.name);
    pokemonDetail.abilities = abilities;

    //retorna objeto preenchido
    return pokemonDetail;
}

//criando os elementos html dinamicamente
function convertPokemonToElement(pokemon) {
    return `
    <section class="container ${pokemon.principal_type}">

        <!--Gerado dinamincamente-->
        <div class="informations">
            <div class="info-pokemon">
            <span class="name">${pokemon.name}</span>
            <div class="pokemon-type">
                ${pokemon.types.map((type) => `<span class="type ${type}">${type}</span>`).join(" ")}
            </div>
            </div>
            <div class="info-number">
                <span class="number">#${pokemon.number}</span>
            </div>
            </div>
            <div class="image">
            <img src="${pokemon.image}" alt="Imagem do pokemon Bulbasaur">
            </div>
            <div class="pokemon-details">
            <ul>
                <li>Name: ${pokemon.name}</li>
                <li>Height: ${pokemon.height}</li>
                <li>Weight: ${pokemon.weight}</li>
                <li>Abilities: ${pokemon.abilities.map((abilitie) => `${abilitie}`)}
            </ul>
            </div>
        </div>
    </section>
    `
}

pegandoDetalhe = () => {
    const url = `https://pokeapi.co/api/v2/pokemon/${pokemonNumber}/`;

    var resultado = fetch(url)
        .then(function (response) {
            return response.json();
        })
        .then(function (jsonBody) {
            let criaObjeto = DetailPokemon(jsonBody);
            let criaElementos = convertPokemonToElement(criaObjeto);
            base.innerHTML += criaElementos;
        })
        .catch(function (error) {
            console.log(error);
        })
}

//chamando a funcao de criacao
pegandoDetalhe();