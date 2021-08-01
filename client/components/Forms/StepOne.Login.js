import styled from 'styled-components'
import Button from '../UI/Button.js'

const Form = styled.form`
  border: 1px solid;
  border-radius: 16px;
  padding: 16px;
  margin: 16px 0;
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

function StepOne(props) {
  return (
    <Form>
      {props.error.error ?
        <Error>
          {props.error.errorMsg}
        </Error> : ''
      }
      <label htmlFor='email_or_username'>Username or email</label>
      <br/>
      <Input
        onChange={props.handleChange}
        name='email_or_username'
        value={props.user.email_or_username}
        type='text'
        id='username'
      />
      <br/>
      <label htmlFor='password'>Password</label>
      <br/>
      <Input
        onChange={props.handleChange}
        name='password'
        value={props.user.password}
        type='password'
        id='password'
      />
      <br/>
      <Button
        handleClick={props.submitLogin}
        buttonText='Login'
      />
      </Form>
  );
}

export default StepOne