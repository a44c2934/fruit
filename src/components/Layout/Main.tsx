import classNames from 'classnames';
import * as React from 'react';
import styles from './Layout.module.css';

interface IMainProps {
  children: React.ReactNode;
}

const Main: React.FunctionComponent<IMainProps> = ({ children }) => {
  return (
    <main className={classNames(styles.main)}>
      {children}
    </main>
  );
};

export default Main;
