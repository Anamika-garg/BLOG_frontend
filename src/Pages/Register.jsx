import React, { useState } from 'react'
import {Link , useNavigate}  from 'react-router-dom';
import axios from 'axios';
import { myUrl } from '../urls';

const Register = () => {
  const [userData , setUserData] = useState({
    name : '',
    email : '',
    password : '',
    password2 : '',
  })

  const [error , setError] = useState('');
  const navigate =useNavigate();
  const changeInputHandle = (e) =>{
    setUserData(prevState =>{
      return {
        ...prevState , [e.target.name] : e.target.value 
      }
    })
  }



  const registerUser = async(e)=>{
    e.preventDefault();

    try {
      
      const response = await axios.post(`${myUrl}/api/users/register` , userData);

      const newUser = await response.data;
      console.log(newUser);

      if(newUser.error){
        setError(newUser.error)
      }

      else{
        navigate('/login');
      }

    } catch (err) {
      console.log(err.response)
      setError(err.response.data.msg)
    }
  }



  return (
    <section className="register">
      <div className="container">
        <h2>Sign Up</h2>
        <form action="" onSubmit={registerUser} className="form register_form">
          {error ? <p className="form_error-message">{error}</p> : <></> }
          
          <input type="text" placeholder='Full Name' name = 'name' value={userData.name} onChange={changeInputHandle} />

          <input type="email" placeholder='Email' name = 'email' value={userData.email} onChange={changeInputHandle} />

          <input type="password" placeholder='Password' name = 'password' value={userData.password} onChange={changeInputHandle} />

          <input type="password" placeholder='Confirm Password' name = 'password2' value={userData.password2} onChange={changeInputHandle} />

          <button className="btn primary">Register</button>
        </form>
        <small>Already have an Account? <Link to="/login">Sign in</Link></small>
      </div>
    </section>
  )
}

export default Register