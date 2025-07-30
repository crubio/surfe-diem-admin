import auth from '@lib/auth'
import { useState } from 'react';
import { Button, Form } from "react-bootstrap";
import { toast } from 'react-toastify';

interface LoginFormProps {
  onSuccess: () => void;
}

export const LoginForm = (props: LoginFormProps) => {
  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
      setLoading(false);
      return;
    }
    
    auth.login({
      username: username,
      password: password,
    }).then(() => {
      props.onSuccess();
    }).catch(() => {
      setLoading(false);
      toast.error("Invalid username or password");
    }).finally(() => {
      setLoading(false);
    });
  }

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control
          required
          type="email"
          placeholder="Enter email or username"
          value={username}
          onChange={e => setUserName(e.target.value)}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control
          required
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
      </Form.Group>
      
      <Button 
        variant="primary" 
        type="submit" 
        disabled={loading}
        className="w-100"
      >
        {loading ? (
          <>
            <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
            Signing in...
          </>
        ) : (
          'Sign In'
        )}
      </Button>
    </Form>
  )
}