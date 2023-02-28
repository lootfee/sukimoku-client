import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApi } from '../contexts/ApiProvider';
import { useFlash } from '../contexts/FlashProvider';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Body from '../components/Body';
import InputField from '../components/InputField';

export default function RegistrationPage() {
  const [formErrors, setFormErrors] = useState({});
  const flash = useFlash();

  const navigate = useNavigate();
  const api = useApi();

  const usernameField = useRef();
  const emailField = useRef();
  const passwordField = useRef();
  const password2Field = useRef();

  useEffect(() => {
    usernameField.current.focus();
  }, []);

  const onSubmit = async (event) => {
    event.preventDefault();
    const username = usernameField.current.value;
    const email = emailField.current.value;
    const password = passwordField.current.value;

    const errors = {};
    if (!username){
        errors.name = "Username must not be blank";
    }
    if (!email){
        errors.email = "Email must not be blank";
    }
    if (!password){
        errors.password = "Password must not be blank";
    }
    if (passwordField.current.value !== password2Field.current.value) {
        errors.password2 = "Passwords don't match";
    }

    setFormErrors(errors);
    if (Object.keys(errors).length > 0) {
        return;
    }
    else {
        setFormErrors({});
        const data = await api.post('/users', {
            name: usernameField.current.value,
            email: emailField.current.value,
            password: passwordField.current.value
        });
        if (!data.ok) {
            setFormErrors(data.body.errors.json);
        }
        else {
            setFormErrors({});
            flash('You have successfully registered!', 'success');
            navigate('/login');
        }
    }
  };

  return (
    <Body>
      <h1>Register</h1>
      <Form onSubmit={onSubmit}>
        <InputField
          name="name" label="Name"
          error={formErrors.name} fieldRef={usernameField} />
        <InputField
          name="email" label="Email address"
          error={formErrors.email} fieldRef={emailField} />
        <InputField
          name="password" label="Password" type="password"
          error={formErrors.password} fieldRef={passwordField} />
        <InputField
          name="password2" label="Password again" type="password"
          error={formErrors.password2} fieldRef={password2Field} />
        <Button variant="primary" type="submit">Register</Button>
      </Form>
    </Body>
  );
}