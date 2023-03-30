import React, { useState } from 'react';
import Input from '../components/ui/Input';

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };
  return (
    <div className="flex justify-center items-center">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md">
        <h2 className="font-bold mb-6 text-sky-900">Forgot your password? Enter your email and we'll send you a reset link.</h2>

        <Input onChange={setEmail} value={email} type={'email'} label={'Email'} name={'email'} />

        <button type="submit" className="bg-sky-800 hover:bg-sky-900 text-white rounded px-4 py-2 w-full">
          Submit
        </button>
      </form>
    </div>
  );
};

export default ForgotPasswordPage;
