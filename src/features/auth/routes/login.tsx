
import { useNavigate } from 'react-router-dom';

export const Login = () => {
  const navigate = useNavigate();

  return (
    <div title="Log in to your account">
      {/* TODO: create a form like such */}
      {/* <LoginForm onSuccess={() => navigate('/app')} /> */}
      <div>Login page - public route</div>
    </div>
  );
};