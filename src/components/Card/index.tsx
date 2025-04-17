import React from 'react';
import { CardProps } from '../../types/components/Card.types';
import styles from './Card.module.css';

const Card: React.FC<CardProps> = ({ title, children, className = '' }) => {
  return (
    <div className={`${styles.card} ${className}`}>
      <header className={styles.cardHeader}>
        <span>{title}</span>
      </header>
      <section className={styles.cardBody}>{children}</section>
    </div>
  );
};

export default Card;
