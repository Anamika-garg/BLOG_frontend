import React, { useState , useEffect , useContext } from 'react'
import { Link , useNavigate , useParams } from 'react-router-dom'
import { FaEdit } from "react-icons/fa";
import { FaCheck } from "react-icons/fa";
import { UserContext } from '../Context/userContext';
import axios from 'axios';


const UserProfile = () => {

  const [avatar , setAvatar] = useState('');
  const [name , setName] = useState('');
  const [email , setEmail] = useState('');
  const [currentPswd , setCurrentPswd] = useState('');
  const [newPswd , setNewPswd] = useState('');
  const [confirmNewPswd , setConfirmNewPswd] = useState('');
  const [error , setError] = useState('');
  const {id} = useParams();
  const [isAvatarTouched , setIsAvatarTouched] = useState(false)

  const navigate = useNavigate(); 
  const {currentUser} = useContext(UserContext);
  const token = currentUser?.token;

  //redirect to login page for any user who isn't logged in

  useEffect(()=>{
    if(!token){
      navigate('/login')
    }
  } , [])


  useEffect(() =>{
    const fetchUser = async()=>{
      try {
        // const response = await axios.get(`https://anamika-blog-backend.vercel.app/api/users/${id}` );
        const response = await axios.get(`https://anamika-blog-backend.vercel.app/api/users/${id}` );
        const {name , email , avatar} = response.data;
        setName(name)
        setEmail(email)
        setAvatar(avatar)

      } catch (err) {
        console.log(err)
      }
    }
    fetchUser();
  } , [])

  const changeAvatarHandler = async()=>{
    setIsAvatarTouched(false);
    try {
      const postData = new FormData();
      postData.set('avatar' , avatar);
      const response = await axios.post('https://anamika-blog-backend.vercel.app/api/users/change-avatar' , postData , { headers : {
        Authorization : `Bearer ${token}`
      }})

      setAvatar(response.data.avatar);

      if(response.data.error){
        setError(response.data.error)
      }
    } catch (err) {
      console.log(err)
    }
  }

  const updateUserDetails = async(e)=>{
    e.preventDefault();
    try {
      const userData = new FormData();
      userData.set('name' , name)
      userData.set('email' , email)
      userData.set('currentPassword' , currentPswd)
      userData.set('newPassword' , newPswd)
      userData.set('confirmNewPassword' , confirmNewPswd)

      const response = await axios.patch(`https://anamika-blog-backend.vercel.app/api/users/edit-user` , userData , {
        
        headers : {
          Authorization : `Bearer ${token}`
        }
      })

      if(!response.data.error){
        //Logout user
        navigate('/logout')
      }
      else{
        setError(response.data.error)
      }


    } catch (err) {
      setError(response.data.error)
    }
  }

  return (
    <section className="profile">
      <div className="container profile_container">
        <Link to={`/myposts/${currentUser.id}`} className ="btn"> My Posts</Link>

        <div className="profile_detail">
          <div className="avatar_wrapper">
            <div className="profile_avatar">
              <img src={`https://anamika-blog-backend.vercel.app/uploads/${avatar}`} alt="" />
            </div>

            <form action="" className="avatar_form">

              <input type="file" name='avatar' id='avatar' accept='png , jpg , jpeg' onChange={e => setAvatar(e.target.files[0])} />
             
             
             
             
              <label htmlFor="avatar" onClick={()=> setIsAvatarTouched(true)} >
                <FaEdit/>
              </label>
            </form>


            {
              isAvatarTouched && <button className="profile_avatar-btn" onClick={changeAvatarHandler}>
              <FaCheck/>
            </button>
            }


          </div>
          <h1>{currentUser.name}</h1>

          {/* Form to update */}
          <form action="" className="form profile_form" onSubmit={updateUserDetails}>
            {error && <p className="form_error-message">{error}</p>}
            
            
            <input type="text" placeholder='Full Name' value={name} onChange={e=> setName(e.target.value)} />

            <input type="email" placeholder='Email' value={email} onChange={e=> setEmail(e.target.value)} />

            <input type="password" placeholder='Current Password' value={currentPswd} onChange={e=> setCurrentPswd(e.target.value)} />

            <input type="password" placeholder='New Password' value={newPswd} onChange={e=> setNewPswd(e.target.value)} />

            <input type="password" placeholder='Confirm Password' value={confirmNewPswd} onChange={e=> setConfirmNewPswd(e.target.value)} />

            <button type="submit" className='btn primary'>Update Details</button>
          </form>
        </div>
      </div>
    </section>
  )
}

export default UserProfile