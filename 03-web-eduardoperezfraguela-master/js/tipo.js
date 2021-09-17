const poke_type = document.getElementById("poke_type");
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
	const url = `https://pokeapi.co/api/v2/type/${url_api}`;
	const res = await fetch(url);
	const pokemon = await res.json();
	createPokemonCard(pokemon);
};

function createPokemonCard(pokemon) {
    var i;

    for (i = 0 ; i < Object.keys(pokemon.pokemon).length; i++){
        const pokemonEl = document.createElement('div');
        pokemonEl.classList.add('pokemon');
        const auxPokemon = pokemon.pokemon[i].pokemon;
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
        poke_type.appendChild(pokemonEl);
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

	poke_type.appendChild(pokemonEl);
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
    while (poke_type.lastElementChild) {
      poke_type.removeChild(poke_type.lastElementChild);
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


window.onload = function () {

    button = document.getElementById("button");
    button.addEventListener("click", searchPokemon, false);
}

window.onchange = function (){

    var index = document.getElementById("options").selectedIndex;

    switch (index){
        case 1: 
            url_api = "normal";
            color = '#FCF7DE';
            break;
        case 2: 
            url_api = "fighting";
            color = "#E6E0D4";
            break;
        case 3: 
            url_api = "flying";
            color = "#F5F5F5";
            break;
        case 4: 
            url_api = "poison";
            color = "#AF7AC5";
            break;    
        case 5: 
            url_api = "ground";
            color ="#f4e7da" ;
            break;
        case 6: 
            url_api = "rock";
            color = '#d5d5d4';
            break;   
        case 7: 
            url_api = "bug";
            color = "#f8d5a3";
            break;
        case 8: 
            url_api = "ghost";
            color = '#A569BD';
            break;
        case 9: 
            url_api = "steel";
            color = "#d5d5d4";
            break;    
        case 10: 
            url_api = "fire";
            color = '#FDDFDF';
            break;
        case 11: 
            url_api = "water";
            color = '#DEF3FD';
            break;       
        
        case 12: 
            url_api = "grass";
            color = colors.grass;
            break;
        case 13: 
            url_api = "electric";
            color = colors.electric;
            break;
        case 14: 
            url_api = "psychic";
            color = colors.psychic;
            break; 
        case 15: 
            url_api = "ice";
            color = "#AED6F1";
            break;       
        case 16: 
            url_api = "dragon";
            color = colors.dragon;
            break;
        case 17: 
            url_api = "dark";
            color = "#808B96";
            break; 
        case 18: 
            url_api = "fairy";
            color = "#C39BD3";
            break;

        default: 
            break;       
    }

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