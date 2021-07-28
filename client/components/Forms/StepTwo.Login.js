import { useEffect, useState } from 'react'
import Button from '../UI/Button.js'

function StepTwo(props) {
  const [selectedUser, setUser] = useState({ session_id: '', username: '' })

  useEffect(() => {
    console.log("User selected: " + selectedUser)
  }, [setUser]);

  const handleRadio = (e) => {
    setUser({ session_id: e.target.id, username: e.target.name })
  }

  const handleSubmit = () => {
    alert("Logged in as: " + selectedUser.username)
  }

  return (
    <form>
      <h2>Please select a username to use for this session:</h2>
      {props.userCollection.map((user) => {
          return(
            <div>
              <input 
                type="radio" 
                value={user.username} 
                key={user.session_id} 
                name={user.username} 
                id={user.session_id} 
                onChange={handleRadio} 
                checked={ user.session_id == selectedUser.session_id } 
              />
              <label for={user.username}>{user.username}</label>
            </div>
          ) 
        })
      }
      <Button
        handleClick={handleSubmit}
        buttonText='Submit'
      />
    </form>
  )
}

export default StepTwo