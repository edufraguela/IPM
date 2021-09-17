const poke_color = document.getElementById("poke_color");
var url_api;
var color;

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
    removeNodes();
	const url = `https://pokeapi.co/api/v2/pokemon-color/${url_api}`;
	const res = await fetch(url);
	const pokemon = await res.json();
	createPokemonCard(pokemon);
};

function createPokemonCard(pokemon) {
    var i;

    for (i = 0 ; i < Object.keys(pokemon.pokemon_species).length; i++){
        const pokemonEl = document.createElement('div');
        pokemonEl.classList.add('pokemon');
        const auxPokemon = pokemon.pokemon_species[i];
        const name = auxPokemon.name[0].toUpperCase() + auxPokemon.name.slice(1);
        const url = auxPokemon.url;
        const id = url.slice(42,-1);
        
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
        poke_color.appendChild(pokemonEl);
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

	poke_color.appendChild(pokemonEl);
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
    while (poke_color.lastElementChild) {
      poke_color.removeChild(poke_color.lastElementChild);
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
    } else {
        scrollToTopBtn.style.display = "none";
    }
}

function yellowFun (){
    url_api = "yellow";
    color = '#FCF7DE';
    getPokemon();
}


function blueFun (){
    url_api = "blue";
    color = "#DEF3FD";
    getPokemon();
}

function whiteFun (){
    url_api = "white";
    color = "#F5F5F5";
    getPokemon();
}

function grayFun (){
    url_api = "gray";
    color = "#d5d5d4";
    getPokemon();
}

function brownFun (){
    url_api = "brown";
    color = '#f4e7da';
    getPokemon();
}

function purpleFun (){
    url_api = "purple";
    color = '#DDA0DD';
    getPokemon();
}

function blackFun (){
    url_api = "black";
    color = "#808B96";
    getPokemon();
}

function redFun (){
    url_api = "red";
    color = '#FDDFDF';
    getPokemon();
}

function pinkFun (){
    url_api = "pink";
    color = "#FFE4E1";
    getPokemon();
}

function greenFun (){
    url_api = "green";
    color = '#DEFDE0';
    getPokemon();
}

window.onload = function () {

    button = document.getElementById("button");
    button.addEventListener("click", searchPokemon, false);

    button1 = document.getElementById("yellow");
    button1.addEventListener("click", yellowFun, false);

    button2 = document.getElementById("blue");
    button2.addEventListener("click", blueFun, false);

    button3 = document.getElementById("white");
    button3.addEventListener("click", whiteFun, false);

    button4 = document.getElementById("gray");
    button4.addEventListener("click", grayFun, false);

    button5 = document.getElementById("brown");
    button5.addEventListener("click", brownFun, false);

    button6 = document.getElementById("purple");
    button6.addEventListener("click", purpleFun, false);

    button7 = document.getElementById("black");
    button7.addEventListener("click", blackFun, false);

    button8 = document.getElementById("red");
    button8.addEventListener("click", redFun, false);

    button9 = document.getElementById("pink");
    button9.addEventListener("click", pinkFun, false);

    button10 = document.getElementById("green");
    button10.addEventListener("click", greenFun, false);

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
