import Layout from "../components/layout.js"
import StepOne from "../components/Forms/StepOne.Login.js"
import { useEffect, useState } from "react"
import StepTwo from "../components/Forms/StepTwo.Login.js"

function Login() {
  const [user, setUser] = useState({email_or_username: "", password: ""})
  const [userCollection, setUserCollection] = useState([])
  const [error, setError] = useState({error: false, errorMsg: ""})

  const submitLogin = () => {
    fetch('http://localhost:3000/sessions', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(user)
    }).then(function(response) {
      return response.json();
    }).then(function(data) {
      if(data.success) {
        setUserCollection(data.usernames)
        setError({ error: false, errorMsg: '' })
      } else {
        setError({ error: true, errorMsg: data.error_msg });
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
      return
    }

    submitLogin()
  }

  useEffect(() => {
    console.log("Error changed " + error.error);
  }, [error, userCollection]);

  return (
    <Layout>
      {userCollection.length < 1 ?
        <StepOne
          handleChange={handleChange}
          handleLogin={handleLogin}
          user={user}
          error={error}
        />
      :
        <StepTwo
          userCollection={userCollection}
        />
      }
    </Layout>
  )
}

export default Login