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

  function handleSubmit (event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
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
    <Form className="container mt-3 mb-3" onSubmit={handleSubmit}>
      <Form.Group className="mb-3 col-lg-6 col-sm-12" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control
          required
          type="email"
          placeholder="Enter email or username"
          value={username}
          onChange={e => setUserName(e.target.value)}
        />
      </Form.Group>

      <Form.Group className="mb-3 col-lg-6 col-sm-12" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control
          required
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
      </Form.Group>
      <Button variant="primary" type="submit" disabled={loading}>
        Login
      </Button>
    </Form>
  )
}