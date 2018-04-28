import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { observer }  from 'mobx-react';
import styles from './styles.scss';

class PokemonList extends Component {
  componentDidMount() {
    const { store } = this.props;
    store.fetchPokemons();
  }
  render() {
    const { store } = this.props;
    const pokemons = store.pokemons;

    if(!pokemons.length) return 'LOADING';

    return (
      <div className={styles.listContainer}>
        <Link to="/detail">
          To detail
        </Link>
        <div className={styles.list}>
          {pokemons
            .map(pokemon => (
              <div key={pokemon.id}>
                {pokemon.id}
                {pokemon.name}
              </div>
            ))
          }
        </div>
      </div>
    )
  }
};

export default observer(PokemonList);
