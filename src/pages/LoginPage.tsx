import React, { useState } from 'react';
import { useAuth } from '../auth/AuthContext';

const LoginPage = () => {
  const { login, isAuthenticated } = useAuth();
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(identifier, password);
    } catch (err) {
      setError('Đăng nhập thất bại');
    }
  };

  if (isAuthenticated) {
    return <div>Bạn đã đăng nhập!</div>;
  }

  return (
    <form onSubmit={handleSubmit}>
      <h3>Đăng nhập</h3>
      <input value={identifier} onChange={e => setIdentifier(e.target.value)} placeholder="Identifier" />
      <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" />
      <button type="submit">Đăng nhập</button>
      {error && <div>{error}</div>}
    </form>
  );
};

export default LoginPage;