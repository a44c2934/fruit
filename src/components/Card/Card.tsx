import { IFruitVegetableItem } from '@/utils/data';
import classNames from 'classnames';
import * as React from 'react';
import styles from './Card.module.css';

interface ICardProps {
  options: IFruitVegetableItem;
  onClick?: () => void;
}

const Card: React.FunctionComponent<ICardProps> = ({ options, onClick = () => { } }) => {
  return (
    <div className={classNames(styles.card)} onClick={() => onClick()}>
      {options?.name}
    </div>
  );
};

export default Card;
