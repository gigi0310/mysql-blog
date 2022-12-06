import React, {useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import axios from "axios";

const Register = () => {

  const [inputs, setInputs] = useState({
    username: "",
    email: "",
    password: "",
  })

  const [err, setErr] = useState(null)

  const navigate = useNavigate()

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
      await axios.post("/auth/register", inputs)
      navigate("/login")
    }catch (err){
      setErr(err.response.data)
    }
  }

  
  return (
    <div className='auth'>
      <h1>Register</h1>
      <form className='form'>

        <input required type="text" placeholder='username' name="username" onChange={handleChange}/>
        <input required type="email" placeholder='email' name="email" onChange={handleChange}/>
        <input required type="password" placeholder='password' name="password" onChange={handleChange} />
        <button onClick={handleSubmit}>Register</button>
        {err && <p>{err}</p>}
        <span>Do you have an account? <Link to="/login">Login</Link></span>

      </form>
    </div>

  )
}

export default Register