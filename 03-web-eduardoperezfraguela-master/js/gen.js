const poke_gen = document.getElementById("poke_gen");
var url_api;
var limit;
var offset;
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
	const url = `https://pokeapi.co/api/v2/pokemon/?limit=${limit}&offset=${offset}`;
	const res = await fetch(url);
	const pokemon = await res.json();
	createPokemonCard(pokemon);
};

async function searchPokemon() {
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
        poke_gen.appendChild(pokemonEl);
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
    poke_gen.appendChild(pokemonEl);
}


const removeNodes = () => {
    while (poke_gen.lastElementChild) {
      poke_gen.removeChild(poke_gen.lastElementChild);
    }
}

function choosen1 (){
    offset = 0;
    limit = 151;
    color = '#FCF7DE';
    getPokemon();
}

function choosen2 () {
    offset = 0;
    limit = 151;
    color = '#FCF7DE';
    getPokemon();
}

function choosen2 () {
    offset = 151;
    limit = 100;
    color = '#FCF7DE';
    getPokemon();
}

function choosen3 () {
    offset = 251;
    limit = 135;
    color = '#FCF7DE';
    getPokemon();
}

function choosen4 () {
    offset = 386;
    limit = 107;
    color = '#FCF7DE';
    getPokemon();
}

function choosen5 () {
    offset = 493;
    limit = 156;
    color = '#FCF7DE';
    getPokemon();
}

function choosen6 () {
    offset = 649;
    limit = 72;
    color = '#FCF7DE';
    getPokemon();
}

function choosen7 () {
    offset = 721;
    limit = 86;
    color = '#FCF7DE';
    getPokemon();
}

function choosen8 () {
    offset = 807;
    limit = 91;
    color = '#FCF7DE';
    getPokemon();
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

    button1 = document.getElementById("button1");
    button1.addEventListener("click", choosen1, false);

    button2 = document.getElementById("button2");
    button2.addEventListener("click", choosen2, false);

    button3 = document.getElementById("button3");
    button3.addEventListener("click", choosen3, false);

    button4 = document.getElementById("button4");
    button4.addEventListener("click", choosen4, false);

    button5 = document.getElementById("button5");
    button5.addEventListener("click", choosen5, false);

    button6 = document.getElementById("button6");
    button6.addEventListener("click", choosen6, false);

    button7 = document.getElementById("button7");
    button7.addEventListener("click", choosen7, false);

    button8 = document.getElementById("button8");
    button8.addEventListener("click", choosen8, false)

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