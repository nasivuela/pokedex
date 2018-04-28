import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import { TransitionGroup, CSSTransition } from "react-transition-group";

import PokemonsListModel from 'models/PokemonsModel';

import PokemonDetail from 'modules/pokemon/Detail';
import PokemonList from 'modules/pokemon/List';

import styles from './App.scss'

const store = new PokemonsListModel();

class App extends Component {
  render() {
    return (
      <div className={styles.app}>
        <Route
          render={({ location }) => (
            <TransitionGroup
              className={styles.app}
            >
              <CSSTransition
                key={location.key}
                classNames={styles.appPageTransition}
                unmountOnExit
                timeout={300}
              >
                <Switch location={location}>
                  <Route
                    exact
                    path="/"
                    component={props =>
                      <PokemonList
                        {...props}
                        store={store}
                      />
                    }
                  />
                  <Route
                    path="/:pokemonId"
                    component={props =>
                      <PokemonDetail
                        {...props}
                        store={store}
                      />
                    }
                  />
                  <Route render={() => <div></div>} />
                </Switch>
              </CSSTransition>
            </TransitionGroup>
          )}
        />
      </div>
    )
  }
}

export default App;
