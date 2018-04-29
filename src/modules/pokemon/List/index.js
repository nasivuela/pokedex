import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
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
    this.getRef = this.getRef.bind(this);
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

  getRef(node) {
    this.node = node;
  }

  render() {
    const { search } = this.state;
    const { store, className, match } = this.props;
    const { pokemons } = store;
    return (
      <div className={cx(styles.listContainer, className)}>
        <InputSearch
          onChange={this.handleSearch}
          value={search}
          placeholder="Filtra pokemons por nombre"
        />
        {!pokemons.length
          ? 'loading'
          : (
            <div
              ref={this.getRef}
              className={styles.list}
            >
                {this.filteredPokemons()
                  .map(pokemon => (
                    <Card
                      parentPositionLeft={
                        this.node
                        && this.node.getBoundingClientRect().left
                      }
                      full={Number(match.params.pokemonId) === pokemon.id}
                      key={pokemon.url}
                      pokemon={pokemon}
                    />
                  ))
                }
                </div>
          )}
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
