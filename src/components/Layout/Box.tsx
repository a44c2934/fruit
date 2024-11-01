import * as React from 'react';
import styles from './Layout.module.css';
import classNames from 'classnames';

interface IBoxProps {
  children?: React.ReactNode;
  title?: string;
}

const Box: React.FunctionComponent<IBoxProps> = ({ children, title }) => {
  return (
    <div className={classNames(styles.box)}>
      {title && (
        <div className={classNames(styles.boxHeader)}>
          {title}
        </div>
      )}
      <div className={classNames(styles.boxBody)}>
        {children}
      </div>
    </div>
  );
};

export default Box;
