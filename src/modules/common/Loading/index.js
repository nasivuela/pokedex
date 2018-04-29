
import React, { PureComponent } from 'react';
import styles from './styles.scss';

class Loading extends PureComponent {
  render() {
    return (
      <div className={styles.loadingWrapper}>
        <div className={styles.loading} />
      </div>
    )
  }
};

export default Loading;
