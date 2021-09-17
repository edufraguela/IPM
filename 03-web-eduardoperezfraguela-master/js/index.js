const poke_index = document.getElementById("poke_index");
var url_api;
var color = '#FCF7DE';
var offset;
var limit;

const colors = {
	fire: '#FDDFDF',
	grass: '#DEFDE0',
	electric: '#FCF7DE',
	water: '#DEF3FD',
	ground: '#f4e7da',
	rock: '#d5d5d4',
	fairy: '#fceaff',
	poison: '#98d7a5',
	bug: '#f8d5a3',
	dragon: '#97b3e6',
	psychic: '#eaeda1',
	flying: '#F5F5F5',
	fighting: '#E6E0D4',
	normal: '#F5F5F5'
};
const main_types = Object.keys(colors);

async function getPokemon () {
	const url = `https://pokeapi.co/api/v2/pokemon/?limit=${limit}&offset=${offset}`;
	const res = await fetch(url);
	const pokemon = await res.json();
	createPokemonCard(pokemon);
};

function createPokemonCard(pokemon) {
    var i;

    for (i = 0 ; i < Object.keys(pokemon.results).length; i++){
        const pokemonEl = document.createElement('div');
        pokemonEl.classList.add('pokemon');
        const auxPokemon = pokemon.results[i];
        const name = auxPokemon.name[0].toUpperCase() + auxPokemon.name.slice(1);
        const url = auxPokemon.url;
        const id = url.slice(34,-1);
        pokemonEl.style.backgroundColor = color;

        const pokeInnerHTML = `
            <div class="img-container">
                <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${ id }.png" alt="${name}" />
            </div>
            <div class="info">
            <span class="number">#${id
                .toString()
                .padStart(3, '0')}</span>
                <h3 class="name">${name}</h3>
            </div>
        `;
        pokemonEl.innerHTML = pokeInnerHTML;
        poke_index.appendChild(pokemonEl);
    }
}

function createPokemonCard1(pokemon) {
	const pokemonEl = document.createElement('div');
	pokemonEl.classList.add('pokemon');

	const poke_types = pokemon.types.map(type => type.type.name);
	const type = main_types.find(type => poke_types.indexOf(type) > -1);
	const name = pokemon.name[0].toUpperCase() + pokemon.name.slice(1);
    const color = colors[type];
    const height = pokemon.height;
    const weight = pokemon.weight;
	
	pokemonEl.style.backgroundColor = color;

	const pokeInnerHTML = `
        <div class="img-container">
            <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${
							pokemon.id
						}.png" alt="${name}" />
        </div>
        <div class="info">
            <span class="number">#${pokemon.id
							.toString()
							.padStart(3, '0')}</span>
            <h3 class="name">${name}</h3>
            <small class="type">Type: <span>${type}</span></small>
            <br>
            <small class="height">Height: <span>${height}</span></small>
            <br>
            <small class="height">Weight: <span>${weight}</span></small>

        </div>
    `;

	pokemonEl.innerHTML = pokeInnerHTML;

	poke_index.appendChild(pokemonEl);
}


async function searchPokemon () {
    removeNodes();
    var id = document.getElementById("busqueda").value.toLowerCase();
    document.getElementById("busqueda").value = '';
	const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
    const res = await fetch(url);
    try{
        const pokemon = await res.json();
        createPokemonCard1(pokemon);
    } catch(err) {
        alert("The name or ID introduced could be wrong.");
        console.log(err);
    };
};

const removeNodes = () => {
    while (poke_index.lastElementChild) {
      poke_index.removeChild(poke_index.lastElementChild);
    }
}


var scrollToTopBtn = document.getElementById("scrollToTopBtn");
var rootElement = document.documentElement;
scrollToTopBtn.addEventListener("click", scrollToTop);
function scrollToTop() {
    rootElement.scrollTo({
      top: 0,
      behavior: "smooth"
    })
  }

window.onscroll = function() {scrollFunction()};
function scrollFunction() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
		scrollToTopBtn.style.display = "block";
		moreBtn.style.display = "block";
    } else {
		scrollToTopBtn.style.display = "none";
		moreBtn.style.display = "none";
    }
}


var moreBtn = document.getElementById("morePKMButton");
moreBtn.addEventListener("click", loadMore);
function loadMore() {
	offset += 20;
	limit += 20;
	getPokemon();
}

window.onsubmit = function(){
    var input = document.getElementById("busqueda");
    input.addEventListener("keyup", function(event) {
    if (event.keyCode === 13) {
        event.preventDefault();
        searchPokemon;
    }
    });

}

window.onload = function () {

    button = document.getElementById("button");
	button.addEventListener("click", searchPokemon, false);

}


function load(){
	offset = 0;
	limit = 20;
	getPokemon();
}

load();
