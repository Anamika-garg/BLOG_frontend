import React, { useState , useEffect} from 'react'
import PostItem from '../components/PostItem';
import { DUMMY_POSTS } from '../../data'
import Loader from '../components/Loader';
import { useParams } from 'react-router-dom';
import axios from 'axios';
const AuthorsPosts = () => {

    const [posts , setPosts] = useState([]);
    const [isLoading , setIsLoading] = useState(false)

    const {id} = useParams();

    useEffect(()=>{
        const fetchPosts = async() =>{
            setIsLoading(true);

            try {
                // const response = await axios.get(`https://anamika-blog-backend.vercel.app/ackend.vercel.app/api/posts/users/${id}`);
                const response = await axios.get(`https://anamika-blog-backend.vercel.app/ackend.vercel.app/api/posts/users/${id}`);
                setPosts(await response.data);

            } catch (error) {
                console.log(error)
            }

            setIsLoading(false)
        }

            fetchPosts();
    } , [id])
    if(isLoading){
        return <Loader/>
    }
  return (
    <section className='posts'>
        {posts.length > 0 ?  <div className="container posts_container">
        {
            posts.map(({_id :id, createdAt , thumbnail , category , title , description, creator}) => <PostItem postID = {id} key ={id} thumbnail = {thumbnail} title = {title} description = {description} createdAt = {createdAt} category = {category} authorID = {creator} />)

          }
        </div> : <h2 className='center'>No Data Found!</h2>}
    </section>
)
}

export default AuthorsPosts