import React, {useState, useContext} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import { AuthContext } from '../context/authContext'
import axios from 'axios'

const Login = () => {

  const [inputs, setInputs] = useState({
    username: "",
    password: "",
  })

  const [err, setErr] = useState(null)

  const navigate = useNavigate()

  const {login} = useContext(AuthContext)

  // console.log(currentUser)

  const handleChange = e =>{
    setInputs (prev => ({
      ...prev, 
      [e.target.name]:e.target.value
    }))
  }

  // use axios to call API, allow us to make an API request;

  const handleSubmit = async e =>{
    e.preventDefault() // prevent to refresh the page when click register button;

    try {
      // await axios.post("/auth/login", inputs)
      await login(inputs);
      navigate("/")
    }catch (err){
      setErr(err.response.data)
    }
  }

  return (
    <div className='auth'>
      <h1>Login</h1>
      <form className='form'>
        <input type="text" placeholder='username' name='username' onChange={handleChange}/>
        <input type="password" placeholder='password' name="password" onChange={handleChange}/>
        <button onClick={handleSubmit}>Login</button>
        {err && <p>{err}</p>}
        <span>Don't you have an account? <Link to="/register">Register</Link></span>

      </form>
    </div>

  )
}

export default Login