import React, { useState , useContext} from 'react'
import {Link , useNavigate}  from 'react-router-dom';
import axios from 'axios';

import {UserContext} from '../Context/userContext'

const Login = () => {
  const [userData , setUserData] = useState({
    email : '',
    password : '',
  })

  const [error , setError] = useState('');
  const navigate = useNavigate();

  const {setCurrentUser} = useContext(UserContext);

  const changeInputHandle = (e) =>{
    setUserData(prevState =>{
      return {
        ...prevState , [e.target.name] : e.target.value 
      }
    })
  }

  const loginUser = async(e) =>{
    e.preventDefault();

    setError('');
    try{
      const response = await axios.post("http://localhost:5000/api/users/login" , userData);

      const user = await response.data;
      setCurrentUser(user)
      if(user.error){
        setError(user.error)
      }else{
      navigate('/');
    }

    }catch(err){
      setError(err.response.data.msg);
    }
  }
  return (
    <section className="register">
      <div className="container">
        <h2>Sign In</h2>
        <form action="" onSubmit={loginUser} className="form register_form">
         {error ? <p className="form_error-message">{error}</p> : <></>}

          <input type="email" placeholder='Email' name = 'email' value={userData.email} onChange={changeInputHandle} />

          <input type="password" placeholder='Password' name = 'password' value={userData.password} onChange={changeInputHandle} />


          <button className="btn primary">Log in</button>
        </form>
        <small>Don't have an Account? <Link to="/register">Sign Up</Link></small>
      </div>
    </section>
  )
}

export default Login