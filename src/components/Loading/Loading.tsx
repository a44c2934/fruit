import classNames from 'classnames';
import * as React from 'react';
import styles from './Loading.module.css';

const Loading: React.FunctionComponent = () => {
  return (
    <div className={classNames(styles.loading)}>
      Loading...
    </div>
  );
};

export default Loading;
