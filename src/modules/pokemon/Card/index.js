import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import {
  observer,
  PropTypes as MobxPropTypes,
} from "mobx-react";
import { CSSTransition } from "react-transition-group";
import { Link } from 'react-router-dom';
import styles from './styles.scss'

class PokemonCard extends Component {
  constructor(props) {
    super(props);

    this.getRef = this.getRef.bind(this);
  }
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

  getRef(node) {
    this.node = node;
  }

  detailStyles(state) {
    const { parentPositionLeft } = this.props;
    const positions = (this.node && this.node.getBoundingClientRect()) || {};
    const y = positions
      && positions.top
      && positions.top + 16;
    const x = positions && positions.left - parentPositionLeft;
    return ({
      transform: state !== 'exited'
        && state !== 'exiting'
        && positions
        ? `translate(-${x}px, ${(y * -1) + 16}px)`
        : 'translate(0,0)',
      top: state === 'entered'
        ? `${y}px`
        : 'initial',
      left: state === 'entered'
        ? `${x}px`
        : 'initial'
    })
  }

  render() {
    const {
      pokemon,
      full,
    } = this.props;
    const linkTo = full
      ? '/'
      : `/${pokemon.id}`;
    return (
      <CSSTransition
        in={full}
        key={pokemon.key}
        classNames={{ exit: styles.cardWrapperExit }}
        timeout={100}
      >
        <div
          ref={this.getRef} className={cx({ [styles.cardWrapper]: !full })}>
          <CSSTransition
            in={full}
            key={pokemon.key}
            classNames={{
              exit: styles.cardFullHelperExit,
              enter: styles.cardFullHelperEnter,
            }}
            timeout={100}
          >
            {state => (
              <div
                style={this.detailStyles(state)}
                className={cx(styles.cardHelper, { [styles.cardFullHelper]: full })}
              >
                <Link
                  to={linkTo}
                  className={cx(styles.card, { [styles.cardFull]: full })}

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
              </div>
            )}
          </CSSTransition>
        </div>
      </CSSTransition>
    );
  }
}

PokemonCard.propTypes = {
  pokemon: MobxPropTypes.observableObject.isRequired,
  parentPositionLeft: PropTypes.number,
};

PokemonCard.defaultTypes = {
  pokemon: {},
};

export default observer(PokemonCard);
