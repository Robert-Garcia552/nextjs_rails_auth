import styled from 'styled-components'

const StyledBtn = styled.button`
  background: ${props => props.buttonColor || "#1d66a3"};
  color: white;
  display: block;
  margin: 16px auto;
  border: none;
  border-radius: 16px;
  padding: 6px;
  min-width: 150px;
`

const Button = (props) => {
  return (
    <StyledBtn
      buttonColor={props.buttonColor}
      onClick={(e) => props.handleClick(e)}
    >
      {props.buttonText}
    </StyledBtn>
  );
}

export default Button