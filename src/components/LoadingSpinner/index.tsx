import { FC } from 'react';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import styles from './LoadingSpinner.module.css';

const LoadingSpinner: FC = () => {
  return (
    <div className={styles.spinnerWrapper}>
      <AiOutlineLoading3Quarters className={styles.spinnerIcon} />
    </div>
  );
};

export default LoadingSpinner;
