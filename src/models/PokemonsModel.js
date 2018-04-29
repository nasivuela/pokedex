import { decorate, observable, action } from "mobx";
import {
  urlToId,
  streamToJson,
  handleFetchErrors,
 } from 'utils';
import PokemonModel from "models/PokemonModel";

const pokemonsUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=12';

export default class PokemonListModel {
  pokemons = [];
  fetching = true;
  error = null

  fetchPokemons() {
    this.fetching = true;
    fetch(pokemonsUrl, { cache: 'force-cache' })
      .then(handleFetchErrors)
      .then(streamToJson)
      .then(response => response.results
        .map((pokemon) => this.handleIncomingPokemon({
          ...pokemon,
          id: urlToId(pokemon.url),
        }))
      )
      .catch(error => this.error = error)
      .finally(() =>  this.fetching = false);
  }

  getPokemon(pokemon) {
    this.handleIncomingPokemon(pokemon);
  }

  handleIncomingPokemon(incomingPokemon) {
    const indexOfExistingPokemon = this.pokemons
      .findIndex(pokemon => Number(pokemon.id) === Number(incomingPokemon.id));

    if (!!~indexOfExistingPokemon) {
      this.updatePokemon(incomingPokemon, indexOfExistingPokemon)
    } else {
      this.addPokemon(incomingPokemon)
    }
  }

  addPokemon({ id, name, url }) {
    const pokemon = new PokemonModel(id, name, url);
    this.pokemons.push(pokemon);
    pokemon.fetch();
  }

  updatePokemon(pokemon, ind) {
    this.pokemons[ind] = {
      ...this.pokemons[ind],
      ...pokemon,
    };
  }
};

decorate(PokemonListModel, {
  pokemons: observable,
  fetching: observable,
  error: observable,
  addPokemons: action,
});
