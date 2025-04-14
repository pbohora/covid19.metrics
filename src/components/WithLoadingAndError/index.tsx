import { FC } from 'react';
import { LoadingErrorWrapperProps } from '../../types/WithLoadingAndError.types';
import styles from './WithLoadingAndError.module.css';
import LoadingSpinner from '../LoadingSpinner';

const WithLoadingErrorWrapper: FC<LoadingErrorWrapperProps> = ({ loading, error, children, isFetching }) => {
  console.log(error, 'error');

  if (loading) return <LoadingSpinner />;
  if (error) return <div className={styles.errorMessage}>{JSON.stringify(error?.data)}</div>;

  return (
    <div className={styles.wrapper}>
      {children}
      {isFetching && (
        <div className={styles.fetching__overlay}>
          <LoadingSpinner />
        </div>
      )}
    </div>
  );
};

export default WithLoadingErrorWrapper;
