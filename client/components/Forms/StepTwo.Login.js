import { useEffect, useState } from 'react'
import Button from '../UI/Button.js'

function StepTwo(props) {
  const [selectedUser, setUser] = useState({  id: '', 
                                              username: '', 
                                              email: '', 
                                              token: '' 
                                            })

  useEffect(() => {
  }, [selectedUser]);

  const handleRadio = (e) => {
    setUser({ id: e.target.id, 
              username: e.target.name, 
              email: e.target.dataset.email,
              token: e.target.dataset.token
            })
  }

  return (
    <form>
      <h2>Please select a username to use for this session:</h2>
      {props.userCollection.map((user) => {
          return(
            <div key={user.user_id}>
              <input
                type="radio" 
                value={user.username}
                name={user.username}
                id={user.user_id}
                data-email={user.email}
                data-token={user.token}
                onChange={handleRadio}
                checked={ user.user_id == selectedUser.id }
              />
              <label htmlFor={user.username}>{user.username}</label>
            </div>
          )
        })
      }
      <Button
        handleClick={(e) => props.createSession(e, selectedUser.id, selectedUser.token)}
        buttonText='Submit'
      />
    </form>
  )
}

export default StepTwo