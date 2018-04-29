import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import PokemonDetail from './Detail';
import {
  observer,
  PropTypes as MobxPropTypes,
} from 'mobx-react';
import styles from './styles.scss'

class PokemonDetailContainer extends Component {
  componentDidMount() {
    const { store, match } = this.props;
    store.getPokemon({ id: match.params.pokemonId });
  }

  render() {
    const { store, match, className } = this.props;
    const pokemon = store.pokemons.find(pokemon => Number(pokemon.id) === Number(match.params.pokemonId));
    return (
      <div className={cx(styles.detailContainer, className)}>
        {pokemon
          ? (
            <PokemonDetail
              pokemon={pokemon}
              type="DETAIL"
            />
          )
          : 'loading'
        }
      </div>
    )
  }
}

PokemonDetailContainer.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      pokemonId: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default observer(PokemonDetailContainer);
