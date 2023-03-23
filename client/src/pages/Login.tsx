import { useState } from 'react';
import { useLoginUserMutation } from '../redux/apiSlice';
import { login, setUser } from '../redux/authSlice';
import { useAppDispatch } from '../redux/hooks';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [loginUser, response] = useLoginUserMutation();

  const dispatch = useAppDispatch();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (response.isLoading) {
      return;
    }

    try {
      const userData = {
        name: username,
        password: password,
      };

      const result = await loginUser({ data: userData }).unwrap();

      if (result.access_token) {
        dispatch(setUser(result.user));
        dispatch(login(result.access_token));
      }
    } catch (error) {
      console.log('we have an error: ', error);
    }
  };

  return (
    <div>
      <div className="flex justify-center items-center">
        <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-md">
          <h2 className="font-bold mb-6 text-sky-900">Log in to your account</h2>
          <div className="mb-4">
            <label htmlFor="username" className="block text-gray-800 font-medium mb-2 text-sm">
              Username
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="border rounded px-3 py-2 w-full focus:outline-none focus:ring focus:border-blue-300"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-800 font-medium mb-2 text-sm">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border rounded px-3 py-2 w-full focus:outline-none focus:ring focus:border-sky-800"
              required
            />
          </div>
          <button type="submit" className="bg-sky-800 hover:bg-sky-900 text-white rounded px-4 py-2 w-full">
            Log In
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
