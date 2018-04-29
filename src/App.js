import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import PokemonsListModel from 'models/PokemonsModel';
import PokemonList from 'modules/pokemon/List';

import styles from './App.scss'

const store = new PokemonsListModel();

class App extends Component {
  render() {
    return (
      <div className={styles.app}>
        <Route
          path="/:pokemonId?"
          render={props =>
            <PokemonList
              {...props}
              store={store}
            />
          }
        />
      </div>
    )
  }
}

export default App;
