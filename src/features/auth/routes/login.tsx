
import { useNavigate } from 'react-router-dom';
import { LoginForm } from '../components/login-form';
import { useUser } from 'hooks/use-user';
import { useEffect } from 'react';

export const Login = () => {
  const navigate = useNavigate();

  const userRequest = useUser();
  const user = userRequest.data || null;

  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate])

  function onSuccess () {
    navigate('/');
  }

  return (
    <div title="Log in to your account">
      {/* TODO: create a form like such */}
      {/* <LoginForm onSuccess={() => navigate('/app')} /> */}
      <LoginForm onSuccess={onSuccess} />
    </div>
  );
};