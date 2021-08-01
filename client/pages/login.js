import { useEffect, useState } from "react"
import Layout from "../components/layout.js"
import StepOne from "../components/Forms/StepOne.Login.js"
import StepTwo from "../components/Forms/StepTwo.Login.js"

function Login() {
  const [user, setUser] = useState({email_or_username: "", password: ""})
  const [userCollection, setUserCollection] = useState([])
  const [error, setError] = useState({error: false, errorMsg: ""})
  
  const handleChange = (e) => {
    setUser({
        ...user,
        [e.target.name]: e.target.value    
    })
  }

  const submitLogin = (e) => {
    e.preventDefault()

    if(user.username === '' || user.password === '') {
      setError({ error: true, errorMsg: 'Please fill in Username / Email.' });
      return
    }

    fetch('http://localhost:3000/sessions/login', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(user)
    }).then(function(response) {
        return response.json()
    }).then(function(data) {
        if(data.success) {
          setUserCollection(data.users)
          if(data.users.length === 1) {
            createSession(e, data.users[0].user_id, data.users[0].token)
            setError({ error: false, errorMsg: '' })
          } 
        } else {
          setError({ error: true, errorMsg: data.error_msg })
        }
    })
  }

  const createSession = (e, id, token) => {
    e.preventDefault()

    fetch(`http://localhost:3000/sessions?user_id=${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Authentication": token
      },
      body: JSON.stringify({id: id})
    }).then(function(response) {
      return response.json();
    }).then(function(data) {
      console.log("ROB---> " + data)
      if(data.id) {
        setError({ error: false, errorMsg: '' })
        alert("Successfully logged in as: " + data.username)
      } else {
        setError({ error: true, errorMsg: data.error_msg });
      }
    })
  }

  useEffect(() => {
  }, [error, userCollection]);

  return (
    <Layout>
      {userCollection.length <= 1 ?
        <StepOne
          handleChange={handleChange}
          submitLogin={submitLogin}
          user={user}
          error={error}
        />
      :
        <StepTwo
          userCollection={userCollection}
          createSession={createSession}
        />
      }
    </Layout>
  )
}

export default Login