import { FC } from 'react';
import { LoadingErrorWrapperProps } from '../../types/WithLoadingAndError.types';
import styles from './WithLoadingAndError.module.css';

const WithLoadingErrorWrapper: FC<LoadingErrorWrapperProps> = ({ loading, error, children }) => {
  console.log(error);
  if (loading) return <div>Loading...</div>;
  if (error) return <div className={styles.errorMessage}>{JSON.stringify(error?.data)}</div>;

  return <>{children}</>;
};

export default WithLoadingErrorWrapper;
