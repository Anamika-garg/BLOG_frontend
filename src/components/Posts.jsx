import React, { useEffect, useState } from 'react'
import PostItem from './PostItem'
import { DUMMY_POSTS } from '../../data'
import Loader from './Loader'
import axios from 'axios'
import { configDotenv } from 'dotenv'

const Posts = () => {
    const [posts , setPosts] = useState([]);
    const [isLoading , setIsLoading] = useState(false)


    useEffect(()=>{
        const fetchPosts = async() =>{
            setIsLoading(true);

            try {
                // const response = await axios.get(`https://anamika-blog-backend.vercel.app/ackend.vercel.app/api/posts`);
                const response = await axios.get(`https://anamika-blog-backend.vercel.app/ackend.vercel.app/api/posts`);
                setPosts(await response.data);

            } catch (error) {
                console.log(error)
            }

            setIsLoading(false)
        }

            fetchPosts();
    } , [])
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


export default Posts;

