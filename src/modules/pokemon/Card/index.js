import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import {
  observer,
  PropTypes as MobxPropTypes,
} from "mobx-react";
import { Link } from 'react-router-dom';
import styles from './styles.scss'

class PokemonCard extends Component {
  getTypeNames() {
    const { pokemon } = this.props;
    return pokemon.types
      ? (
        <div className={styles.typesBlock}>
          {pokemon && pokemon.types.map(type => (
            <span
              className={styles.type}
              key={type}
            >
              {type}
            </span>
          ))}
        </div>
      )
      : null;
  }

  render() {
    const {
      pokemon,
      type,
    } = this.props;
    const linkTo = type === 'DETAIL'
      ? '/'
      : `/${pokemon.id}`;
    return (
      <Link
        to={linkTo}
        className={cx(styles.card, {[styles.cardFull]: type === 'DETAIL'})}
      >
        {pokemon && (
          <Fragment>
            <div className={styles.blockImg}>
              <img
                className={styles.img}
                src={pokemon.img}
                alt={pokemon.name}
              />
            </div>

            <div className={styles.blockInfo}>
              <div className={styles.blockId}>
                {`ID / ${pokemon.id}`}
              </div>
              <h2 className={styles.title}>
                {pokemon.name}
              </h2>
              {this.getTypeNames()}
              {pokemon.evolvesFrom && (
                <div className={styles.evolutionBlock}>
                  Evoluciona de:
                  <div className={styles.evolvesFrom}>
                    {pokemon.evolvesFrom}
                  </div>
                </div>
              )}
            </div>
          </Fragment>
        )}
      </Link>
    );
  }
}

PokemonCard.propTypes = {
  pokemon: MobxPropTypes.observableObject.isRequired,
  type: PropTypes.oneOf([
    'DETAIL',
    'LIST',
  ])
};

PokemonCard.defaultTypes = {
  pokemon: {},
  type: 'LIST',
};

export default observer(PokemonCard);
