import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import { TransitionGroup, CSSTransition } from "react-transition-group";

import PokemonDetail from 'modules/pokemon/Detail';
import PokemonList from 'modules/pokemon/List';

import styles from './App.scss'

console.log(styles);

class App extends Component {
  render() {
    return (
      <div className={styles.app}>
        <Route
          render={({ location }) => (
            <TransitionGroup>
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
                      <PokemonList {...props} />
                    }
                  />
                  <Route
                    path="/:pokemonId"
                    component={props =>
                      <PokemonDetail {...props} />
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
