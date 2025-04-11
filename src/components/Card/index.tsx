import React from 'react';
import styles from './Card.module.css';
import { CardProps } from '../../types/Card.types';

const Card: React.FC<CardProps> = ({ size = 'medium', title, children, style }) => {
  return (
    <div className={`${styles.card} ${styles[size]}`} style={style}>
      <div className={styles.cardHeader}>
        <h3 className={styles.cardTitle}>{title}</h3>
      </div>
      <div className={styles.cardBody}>{children}</div>
    </div>
  );
};

export default Card;
