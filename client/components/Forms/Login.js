import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Button from '../UI/Button.js';

const Form = styled.form`
  border: 1px solid;
  border-radius: 16px;
  padding: 16px;
  margin-top: 16px;
`

const Input = styled.input`
  border-radius: 10px;
  padding: 6px;
  margin: 16px auto;
`

const Error = styled.div`
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 6px;
  background: red;
  color: white;
  max-width: 220px;
`

function Login() {
  const [user, setUser] = useState({email_or_username: '', password: ''});
  const [error, setError] = useState({error: false, errorMsg: ''});

  const submitLogin = () => {
    fetch('http://localhost:3000/sessions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        "Accept": "application/json"
      },
      body: JSON.stringify(user)
    }).then(function(response) {
      return response.json();
    }).then(function(data) {
      if(data.success) {
        // TAKE USER INTO APP
        alert('Login Success')
        setError({ error: false, errorMsg: '' })
        console.log("Success: " + data.success);
      } else {
        setError({ error: true, errorMsg: data.error_msg });
        console.log("Error: " + error);
      }
    });
  }
  
  const handleChange = (e) => {
    setUser({
        ...user,
        [e.target.name]: e.target.value    
    });
  }
  
  const handleLogin = (e) => {
    e.preventDefault();
    if(user.username === '' || user.password === '') {
      setError({ error: true, errorMsg: 'Please fill in Username / Email.' });
      return;
    }

    submitLogin(user);
  }

  useEffect(() => {
    console.log("Error changed " + error.error);
  }, [error]);

  return (
    <Form>
      {error.error ?
        <Error>
          {error.errorMsg}
        </Error> : ''
      }
      <label htmlFor='email_or_username'>Username or email</label>
      <br/>
      <Input
        onChange={handleChange}
        name='email_or_username'
        value={user.email_or_username}
        type='text'
        id='username'
      />
      <br/>
      <label htmlFor='password'>Password</label>
      <br/>
      <Input
        onChange={handleChange}
        name='password'
        value={user.password}
        type='password'
        id='password'
      />
      <br/>
      <Button 
        buttonText='Login'
        handleLogin={(user) => handleLogin(user)}
      />
      {/* <Button 
        buttonText='Sign Up'
        buttonColor='green'
        onClick={handleLogin}
      /> */}
    </Form>
  );
}

export default Login;