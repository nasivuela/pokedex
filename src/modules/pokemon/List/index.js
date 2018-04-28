import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class PokemonList extends Component {
  render() {
    return <div>
      List
      <Link to="/detail">
        To detail
      </Link>
    </div>;
  }
}

export default PokemonList;