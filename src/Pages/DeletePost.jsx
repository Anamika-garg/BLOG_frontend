import React , {useEffect , useContext, useState} from 'react'
import { Link, useNavigate , useLocation} from 'react-router-dom';
import { UserContext } from '../Context/userContext';
import axios from 'axios';
import Loader from '../components/Loader';

const DeletePost = ({postId : id}) => {

  const navigate = useNavigate(); 
  const {currentUser} = useContext(UserContext);
  const token = currentUser?.token;
  const [isLoading , setIsLoading] = useState(false)

  //redirect to login page for any user who isn't logged in

  useEffect(()=>{
    if(!token){
      navigate('/login')
    }
  } , [])


  const removePost = async()=>{
    setIsLoading(true)
    try {
      const response = await axios.delete(`https://anamika-blog-backend.vercel.app/api/posts/${id}` , {withCredentials : true , headers : {
        Authorization : `Bearer ${token}`
      }})
      // const response = await axios.delete(`https://anamika-blog-backend.vercel.app/api/posts/${id}` , {withCredentials : true , headers : {
      //   Authorization : `Bearer ${token}`
      // }})

      console.log(await response.data)
      if(!response.data.error){
        if(location.pathname == `/myposts/${currentUser.id}`){
          navigate(0)
        }
        else{
          navigate('/')
        }
      }
      else{
        console.log("Couldn't delete the post" , id)
      }
    } catch (error) {
      console.log(error)
    }
    setIsLoading(false)
  }

  if(isLoading){
    return <Loader/>
  }
  return (
    <Link className='btn sm danger' onClick={() => removePost(id)}>Delete</Link>
  )
}

export default DeletePost