import React , {useContext , useEffect , useState} from 'react'
import PostAuthor from '../components/PostAuthor'
import {Link, useParams} from 'react-router-dom';
import Thumbnail from '../../public/2.jpg';
import loader from '../components/Loader';

import DeletePost from './DeletePost'
import { UserContext } from '../Context/userContext';
import axios from 'axios';
import { myUrl } from '../urls';
const PostDetails = () => {
  const {id} = useParams();
  const [post , setPost] = useState(null)
  const [error , setError] = useState(null)
  const [isLoading , setIsLoading] = useState(false)

  const {currentUser} = useContext(UserContext)
  useEffect(()=>{
    const getPost = async()=>{
      setIsLoading(true);

      try {
        // const response = await axios.get(`https://anamika-blog-backend.vercel.app/api/posts/${id}`);
        const response = await axios.get(`${myUrl}/api/posts/${id}`)
        setPost(await response.data)
        // console.log(response.data)
      } catch (error) {
        setError(error)
      }

      setIsLoading(false)
    }

    getPost();
  },[])


  if(isLoading){
    return <loader/>
  }
  return (
    <section className="post-detail">
      {error && <p className='error'>{error}</p>}



   {post ?   <div className="container post-detail_container">
        <div className="post-detail_header">
          <PostAuthor authorID={post.creator} createdAt={post.createdAt}/>
         {currentUser?.id == post?.creator &&  <div className="post-detail_buttons">
            <Link to ={`/posts/${post?._id}/edit`} className = 'btn sm primary'>Edit</Link>
            <DeletePost postId = {id}/>
          </div>}
        </div>

       {post ? 
       <> <h1>{post.title}</h1> 
          <div className="post-detail_thumbnail">
          <img src={`${myUrl}/uploads/${post.thumbnail}`} alt="" />
        </div> 
        <p dangerouslySetInnerHTML={{__html : post.description}}></p>
        </>: <></>
        }
        
      </div> : <></>}
    </section>
  )
}

export default PostDetails