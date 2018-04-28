import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Card from 'modules/pokemon/Card';
import {
  observer,
  PropTypes as MobxPropTypes
} from 'mobx-react';

class PokemonDetail extends Component {
  render() {
    const { pokemon } = this.props;
    return (
      <Card
        key={pokemon.url}
        pokemon={pokemon}
        type="DETAIL"
      />
    );
  }
}

PokemonDetail.propTypes = {
  pokemon: MobxPropTypes.observableObject.isRequired,
};

export default observer(PokemonDetail);