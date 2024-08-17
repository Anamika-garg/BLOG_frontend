import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import pic from '../../public/1.jpg'
import axios from 'axios';
import ReactTimeAgo from 'react-time-ago';
import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en.json';
import ru from 'javascript-time-ago/locale/ru.json';


TimeAgo.addDefaultLocale(en)
TimeAgo.addLocale(ru)
const PostAuthor = ({ authorID, createdAt }) => {
  
  const [author , setAuthor] = useState([]);


    useEffect(() => {

      const getAuthor = async () => {
        try {
          // const response = await axios.get(`https://anamika-blog-backend.vercel.app/ackend.vercel.app/api/users/${authorID}`);
          const response = await axios.get(`https://anamika-blog-backend.vercel.app/ackend.vercel.app/api/users/${authorID}`);
          setAuthor(await response?.data)


        } catch (error) {
          console.log(error)
        }
      }

      getAuthor();
    }, []); 


  return (
    <Link to={`/posts/users/${authorID}`} className='post_author'>
      <div className="post_author-avatar">
        <img src={`https://anamika-blog-backend.vercel.app/ackend.vercel.app/uploads/${author?.avatar}`} alt="" />
      </div>
      <div className="post_author-details">
       { author ?  <h5>By : {author.name} </h5> : <h5>By : Anamika Garg</h5>}

      
        <small><ReactTimeAgo date={new Date(createdAt)} locale='en-US'/></small>
      </div>
    </Link>
  )
}

export default PostAuthor