import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class PokemonDetail extends Component {
  render() {
    return <div>
      Detail
      <Link to="/">
        To list
      </Link>
    </div>;
  }
}

PokemonDetail.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      pokemonId: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default PokemonDetail;