import classNames from 'classnames';
import * as React from 'react';
import styles from './Layout.module.css';

interface IMenuProps {
  children?: React.ReactNode;
}

const Menu: React.FunctionComponent<IMenuProps> = ({ children }) => {
  return (
    <div className={classNames(styles.menu)}>
      {children}
    </div>
  );
};

export default Menu;
