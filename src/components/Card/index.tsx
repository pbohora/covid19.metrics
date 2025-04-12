import React from 'react';
import styles from './Card.module.css';
import { CardProps } from '../../types/Card.types';

const Card: React.FC<CardProps> = ({ title, children, className = '' }) => {
  return (
    <div className={`${styles.card} ${className}`}>
      <div className={styles.cardHeader}>
        <h6 className={styles.cardTitle}>{title}</h6>
      </div>
      <div className={styles.cardBody}>{children}</div>
    </div>
  );
};

export default Card;
