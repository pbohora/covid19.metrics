import { FC } from 'react';
import { AiOutlineInbox } from 'react-icons/ai';
import styles from './NoData.module.css';

const NoData: FC = () => {
  return (
    <div className={styles.noDataWrapper}>
      <AiOutlineInbox size={30} />
      <p>No data available</p>
    </div>
  );
};

export default NoData;
