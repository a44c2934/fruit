import * as React from 'react';
import styles from './Layout.module.css';
import classNames from 'classnames';

interface IContainerProps {
  children: React.ReactNode;
}

const Container: React.FunctionComponent<IContainerProps> = ({ children }) => {
  return (
    <div className={classNames(styles.container)}>
      {children}
    </div>
  );
};

export default Container;
