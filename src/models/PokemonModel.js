import { observable, decorate } from "mobx";
import { streamToJson } from 'utils';

const baseUrl = 'https://pokeapi.co/api/v2/pokemon/';

export default class PokemonModel {
  constructor(id, name = null, url = null) {
    this.id = id;
    this.name = name;
    this.url = url || `${baseUrl}${id}`;
    this.types = [];
    this.img = null;
    this.speciesUrl = null;
    this.evolvesFrom = null;
  }

  fetchSpecies(url) {
    return fetch(url, { cache: 'force-cache' })
      .then(streamToJson)
  }

  fetchEvolution(url) {
    return fetch(url, { cache: 'force-cache' })
      .then(streamToJson)
  }

  findInArr(arr, pokemonName, previousPokemonName, pos = 0) {
    return pokemonName === arr[pos].species.name
      ? previousPokemonName
      : this.findPrevPokemonInChain(arr[pos].evolves_to, pokemonName, arr[pos].species.name, 0);
  }

  findPrevPokemonInChain(arr, pokemonName, previousPokemonName, pos = 0) {
    return arr
      && pos <= arr.length - 1
      && this.findInArr(arr, pokemonName, previousPokemonName, pos);
  }


  getEvolution(speciesUrl) {
    if (!this.speciesUrl) { return; }
    this.fetchSpecies(this.speciesUrl)
      .then(species => this.fetchEvolution(species.evolution_chain.url))
      .then(evolutionChain => this.findPrevPokemonInChain([evolutionChain.chain], this.name))
      .then(evolvesFrom => this.evolvesFrom = evolvesFrom)
  }

  fetch() {
    if (!this.id) { return };
    fetch(this.url, { cache: 'force-cache' })
      .then(response => response.json())
      .then(({
        id,
        name,
        species,
        types,
        sprites,
      }) => {
        this.id = id;
        this.name = name;
        this.types = types.map(t => t.type.name);
        this.img = sprites.front_default;
        this.speciesUrl = species.url;
        this.getEvolution();
      });
  }
};

decorate(PokemonModel, {
  id: observable,
  types: observable,
  img: observable,
  evolvesFrom: observable,
});
