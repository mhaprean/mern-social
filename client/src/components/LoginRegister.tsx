import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useLoginUserMutation, useRegisterUserMutation } from '../redux/apiSlice';
import { login, setUser } from '../redux/authSlice';
import { useAppDispatch } from '../redux/hooks';

interface IPropsLoginRegister {
  isRegister?: boolean;
}

const LoginRegister = ({ isRegister = false }: IPropsLoginRegister) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  const navigate = useNavigate();

  const [loginUser, response] = useLoginUserMutation();
  const [registerUser, registerResponse] = useRegisterUserMutation();

  const dispatch = useAppDispatch();

  const handleRegister = async () => {
    if (registerResponse.isLoading) {
      return;
    }
    try {
      const userData = {
        name: username,
        password: password,
        email: email,
      };

      const result = await registerUser({ data: userData }).unwrap();

      if (result.access_token) {
        dispatch(setUser(result.user));
        dispatch(login(result.access_token));

        navigate('/');
      }
    } catch (error) {
      console.log('error', error);
    }
  };

  const handleLogin = async () => {
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

        navigate('/');
      }
    } catch (error) {
      console.log('we have an error: ', error);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (isRegister) {
      handleRegister();
    } else {
      handleLogin();
    }
  };

  return (
    <div className="flex justify-center items-center">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-md">
        <h2 className="font-bold mb-6 text-sky-900">{isRegister ? 'Register a new account' : 'Log in to your account'}</h2>

        {isRegister && (
          <div className="mb-4">
            <label htmlFor="username" className="block text-gray-800 font-medium mb-2 text-sm">
              Email
            </label>
            <input
              type="email"
              id="name"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border text-base rounded px-3 py-2 w-full  focus:outline-none focus:ring focus:border-blue-300"
              required
            />
          </div>
        )}
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
            className="border text-base  rounded px-3 py-2 w-full focus:outline-none focus:ring focus:border-blue-300"
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
            className="border text-base  rounded px-3 py-2 w-full focus:outline-none focus:ring focus:border-sky-800"
            required
          />
        </div>

        {!isRegister && (
          <div className="mb-4">
            <Link to={'/forgot-password'} className="text-sm text-gray-600">
              Forgot password?
            </Link>
          </div>
        )}

        <button type="submit" className="bg-sky-800 hover:bg-sky-900 text-white rounded px-4 py-2 w-full">
          {isRegister ? 'Register' : 'Log In'}
        </button>

        <div className="flex items-center font-normal mt-4 text-gray-800">
          {isRegister ? (
            <>
              <p className="text-sm">Have already an account?</p>{' '}
              <Link to={'/login'} className="ml-2 text-sm font-bold">
                Login here
              </Link>
            </>
          ) : (
            <>
              <p className="text-sm">Not a member?</p>{' '}
              <Link to={'/register'} className="ml-2 text-sm font-bold">
                Register here
              </Link>
            </>
          )}
        </div>
      </form>
    </div>
  );
};

export default LoginRegister;
