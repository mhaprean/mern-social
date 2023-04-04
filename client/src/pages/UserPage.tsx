import { useParams } from 'react-router-dom';
import { useGetUserQuery } from '../redux/apiSlice';

const UserPage = () => {
  const { id } = useParams();

  const { data: user, isLoading } = useGetUserQuery({ id: id || '' }, { skip: !id });

  return (
    <div>
      <h2>User page</h2>
      {isLoading && <p>Loading...</p>}

      {!isLoading && user && <p>user is: {user.name}</p>}
    </div>
  );
};

export default UserPage;
