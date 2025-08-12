
import { useNavigate } from 'react-router-dom';
import { LoginForm } from '../components/login-form';
import { toast } from 'react-toastify';
import { Card } from 'react-bootstrap';

export const Login = () => {
  const navigate = useNavigate();
  
  const notify = () => toast('Login successful!');

  function onSuccess() {
    notify();
    navigate('/');
    history.go(0)
  }

  return (
    <div className="py-5">
      <div className="row justify-content-center">
        <div className="col-md-6 col-lg-4">
          <Card>
            <Card.Body>
              <Card.Title className="text-center mb-4">
                <i className="bi bi-person-circle me-2"></i>
                Sign In
              </Card.Title>
              <LoginForm onSuccess={onSuccess} />
            </Card.Body>
          </Card>
        </div>
      </div>
    </div>
  );
};