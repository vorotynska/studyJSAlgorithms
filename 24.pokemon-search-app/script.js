const pokemonInfoContainer = document.querySelector("#pokemon-info-container");
const searchInput = document.getElementById("search-input");
const searchButton = document.getElementById("search-button");
const pokemonName = document.getElementById("pokemon-name");
const pokemonId = document.getElementById("pokemon-id");
const weight = document.getElementById("weight");
const height = document.getElementById("height");
const types = document.getElementById("types");
const sprite = document.getElementById("sprite");
const pokemonSprite = document.getElementById("pokemon-sprite");
// Info
const infos = ["hp", "attack", "defense", "special-attack", "special-defense", "speed"];

// Utility function to remove special characters
const removeSpecialChars = (val) => {
  return val.trim().replace(/[^A-Za-z0-9\-\s♂♀]/g, '').toLowerCase()
    .replace(/♂/g, '-m')
    .replace(/♀/g, '-f');
};

// Populate the table for stats
pokemonInfoContainer.innerHTML = infos.map((item) => {
  return `
    <tr>
      <td>${item.charAt(0).toUpperCase() + item.slice(1)}:</td>
      <td id="${item}"></td>
    </tr>`;
}).join("");

// Function to fetch and display Pokémon data
const fetchPokemonData = async (input) => {
  const endpoint = `https://pokeapi-proxy.freecodecamp.rocks/api/pokemon/${input}`;
  try {
    const response = await fetch(endpoint);
    if (!response.ok) {
      throw new Error("Pokémon not found");
    }
    const data = await response.json();

    // Populate Pokémon details
    pokemonName.textContent = data.name;
    pokemonId.textContent = `#${data.id}`;
    weight.textContent = `Weight: ${data.weight}`;
    height.textContent = `Height: ${data.height}`;
    pokemonSprite.innerHTML = `
      <img id="sprite" src="${data.sprites.front_default}" alt="${data.name}">
    `;
    
    // Clear previous types before adding new ones
    types.innerHTML = '';

    data.types.forEach((type => {
      types.innerHTML += `<div class="types">${type.type.name}</div>`;
    }))
    
    // Populate stats
    infos.forEach(stat => {
      const statData = data.stats.find(s => s.stat.name === stat);
      if (statData) {
        document.getElementById(stat).textContent = statData.base_stat;
      }
    });

  } catch (error) {
    alert(error.message);
  }
};

// Event listener for the search button
searchButton.addEventListener('click', () => {
  const input = removeSpecialChars(searchInput.value);
  console.log(input);
  if (!input) {
    alert("Please provide a Pokémon name or ID.");
    return;
  }
  fetchPokemonData(input);
});
