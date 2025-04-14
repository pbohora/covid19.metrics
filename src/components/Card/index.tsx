import React from 'react';
import styles from './Card.module.css';
import { CardProps } from '../../types/Card.types';

const Card: React.FC<CardProps> = ({ title, children, className = '' }) => {
  return (
    <div className={`${styles.card} ${className}`}>
      <div className={styles.cardHeader}>
        <div className={styles.cardTitle}>{title}</div>
      </div>
      <div className={styles.cardBody}>{children}</div>
    </div>
  );
};

export default Card;
