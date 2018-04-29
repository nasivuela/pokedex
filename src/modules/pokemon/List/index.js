import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import {
  observer,
  PropTypes as MobxPropTypes
} from 'mobx-react';
import InputSearch from 'modules/common/InputSearch';
import Loading from 'modules/common/Loading';
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

  componentDidUpdate() {
    const { match, history, store } = this.props;
    const idFromParam = match.params.pokemonId
      && Number(match.params.pokemonId)
    if (idFromParam
      && !store.pokemons.some(pokemon => pokemon.id === idFromParam)) {
      // TODO: manage single fetch and pagination
      history.replace('/');
    }
  }

  handleSearch(e) {
    this.setState({ search: e.target.value.toLowerCase() });
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
    const { pokemons, fetching } = store;
    const filteredPokemons = this.filteredPokemons();
    return (
      <div className={cx(styles.listContainer, className)}>
        <InputSearch
          onChange={this.handleSearch}
          value={search}
          placeholder="Filtra pokemons por nombre"
        />
        {!pokemons.length && fetching
          ? <Loading />
          : (

            !filteredPokemons.length
              ? (<div styles={styles.empty}>Pokemon no econtrado</div>)
              : (
                <div
                  ref={this.getRef}
                  className={styles.list}
                >
                  {filteredPokemons
                    .map(pokemon => (
                      <Card
                        parentPositionLeft={
                          this.node
                          && this.node.getBoundingClientRect().left
                        }
                        full={Number(match.params.pokemonId) === pokemon.id}
                        key={pokemon.id}
                        pokemon={pokemon}
                      />
                    ))
                  }
                </div>
              )
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
