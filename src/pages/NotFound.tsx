import { FC } from 'react';
import { AiFillFrown } from 'react-icons/ai';

const NotFound: FC = () => {
  return (
    <div className="page-center">
      <AiFillFrown size={100} />
      <h1>404 - Page Not Found</h1>
      <p>The page you're looking for does not exist.</p>
    </div>
  );
};

export default NotFound;
