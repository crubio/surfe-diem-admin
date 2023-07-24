import auth from '@lib/auth'
import { useState } from 'react';
import { Button, Form } from "react-bootstrap";

interface LoginFormProps {
  onSuccess: () => void;
}

export const LoginForm = (props: LoginFormProps) => {
  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');

  function handleSubmit (event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      console.log('form not valid')
      event.stopPropagation();
    }
    console.log(username, password)
    auth.login({
      username: username,
      password: password,
    }).then(() => {
      props.onSuccess();
    }).catch((error) => {
      console.log('login error:', error)
      // TODO: toast style notification should be dispatched here
    })
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
      <Button variant="primary" type="submit">
        Login
      </Button>
    </Form>
  )
}