import React, { useState , useEffect , useContext } from 'react';
import {DUMMY_POSTS} from '../../data';
import { Link} from 'react-router-dom';
import { useNavigate ,useParams} from 'react-router-dom';
import { UserContext } from '../Context/userContext';
import axios from 'axios';
import Loader from '../components/Loader';
import DeletePost from './DeletePost';
import { myUrl } from '../urls';

const Dashboard = () => {
  const navigate = useNavigate(); 
  const {currentUser} = useContext(UserContext);
  const [posts , setPosts] = useState([])
  const token = currentUser?.token;
  const [isLoading , setIsLoading] = useState(false)
  const {id} = useParams();
  //redirect to login page for any user who isn't logged in

  useEffect(()=>{
    if(!token){
      navigate('/login')
    }
  } , []);

  useEffect(()=>{
    const fetchPost = async()=>{
      setIsLoading(true);
      try {
        const response = await axios.get(`${myUrl}/api/posts/users/${id}` , {
          
          headers : {
            Authorization : `Bearer ${token}`
          }
        });
        

        setPosts(response.data)


        setIsLoading(false)


      } catch (err) {
        console.log(err)
      }

    }

    fetchPost();
  },[id])

  // if(isLoading){
  //   return <Loader/>
  // }


  return (
    <section className="dashboard">
      {
        posts.length ? <div className='container dashboard_container'>
          {
            posts.map(post => {
              return <article key={post._id} className='dashboard_post'>
                <div className="dashboard_post-info">
                  <img className='dashboard_post-thumbnail' src={`${myUrl}/uploads/${post.thumbnail}`} alt="" />
                <h5>{post.title}</h5>
                </div>
                

                <div className="dashboard_post-actions">
                  <Link to = {`/posts/${post._id}`} className = "btn sm">View</Link>
                  <Link to = {`/posts/${post._id}/edit`} className = "btn sm primary">Edit</Link>
                  <DeletePost postId={post._id}/>
                </div>
              </article>
            })
          }
        </div> : <h2 className='center'>You have no posts</h2>
      }
    </section>
  )
}

export default Dashboard