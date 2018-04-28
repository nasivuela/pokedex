import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import {
  observer,
  PropTypes as MobxPropTypes
} from 'mobx-react';
import InputSearch from 'modules/common/InputSearch';
import Card from 'modules/pokemon/Card';
import styles from './styles.scss';

class PokemonList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: '',
    };

    this.handleSearch = this.handleSearch.bind(this);
  }

  componentDidMount() {
    const { store } = this.props;
    store.fetchPokemons();
  }

  handleSearch(e) {
    this.setState({ search: e.target.value });
  }

  filteredPokemons() {
    const { search } = this.state;
    const { store } = this.props;
    return search
      ? store.pokemons
        .filter(pokemon => pokemon.name.includes(search))
      : store.pokemons;
  }

  render() {
    const { search } = this.state;
    const { store } = this.props;
    const pokemons = store.pokemons;

    if (!pokemons.length) return 'LOADING';

    return (
      <div className={styles.listContainer}>
        <Link to="/detail">
          To detail
        </Link>
        <InputSearch
          onChange={this.handleSearch}
          value={search}
          placeholder="Filtra pokemons por nombre"
        />
        <div className={styles.list}>
          {this.filteredPokemons()
            .map(pokemon => (
              <Card
                key={pokemon.url}
                pokemon={pokemon}
              />
            ))
          }
        </div>
      </div>
    )
  }
};

PokemonList.propTypes = {
  store: PropTypes.shape({
    pokemons: MobxPropTypes.observableArrayOf(MobxPropTypes.observableObject)
  }).isRequired,
};

export default observer(PokemonList);
