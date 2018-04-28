import React, { Component } from 'react';
import styles from './App.scss';

class App extends Component {
  render() {
    return (
      <div className={styles.app}>
        <header className={styles.appHeader}>
          <h1 className={styles.appTitle}>Pokedex</h1>
        </header>
      </div>
    );
  }
}

export default App;
