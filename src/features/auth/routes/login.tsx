
import { useNavigate } from 'react-router-dom';
import { LoginForm } from '../components/login-form';
import { useUser } from 'hooks/use-user';
import { useEffect } from 'react';
import { toast } from 'react-toastify';

export const Login = () => {
  const navigate = useNavigate();
  const notify = () => toast('Login successful!');
  const userRequest = useUser();
  const user = userRequest.data || null;

  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate])

  function onSuccess () {
    notify();
    navigate('/');
  }

  return (
    <div title="Log in to your account">
      <LoginForm onSuccess={onSuccess} />
    </div>
  );
};