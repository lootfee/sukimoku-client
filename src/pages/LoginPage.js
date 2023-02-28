import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useUser } from '../contexts/UserProvider';
import { useFlash } from '../contexts/FlashProvider';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Body from '../components/Body';
import InputField from '../components/InputField';

function LoginPage() {
  const [formErrors, setFormErrors] = useState({});
  const { login } = useUser();
  const flash = useFlash();
  const navigate = useNavigate();
  const location = useLocation();
  const emailField = useRef();
  const passwordField = useRef();

  useEffect(() => {
    emailField.current.focus();
  }, []);

  const onSubmit = async (ev) => {
    ev.preventDefault();
    const email = emailField.current.value;
    const password = passwordField.current.value;

    const errors = {};
    if (!email){
        errors.email = "Email must not be blank";
    }
    if (!password){
        errors.password = "Password must not be blank";
    }

    setFormErrors(errors);
    if (Object.keys(errors).length > 0){
        return;
    }

    const result = await login(email, password);
    if (result === 'fail') {
      flash('Invalid email or password', 'danger');
    }
    else if (result === 'ok') {
      let next = '/';
      if (location.state && location.state.next) {
        next = location.state.next;
      }
      navigate(next);
    }

  };

  return (
    <Body>
      <h1>Login</h1>
      <Form onSubmit={onSubmit}>
        <InputField
          name="email" label="Email address" type="email"
          error={formErrors.email} fieldRef={emailField} />
        <InputField
          name="password" label="Password" type="password"
          error={formErrors.password} fieldRef={passwordField} />
        <Button variant="primary" type="submit">Login</Button>

        <hr />
        <p>Don&apos;t have an account? <Link to="/register">Register here</Link>!</p>
      </Form>
    </Body>
  );
}

export default LoginPage;