import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import Loader from '../components/Loader';
import axios from 'axios'
import { myUrl } from '../urls';
const Authors = () => {
  const [authors , setAuthors] = useState([]);
  const [isLoading , setIsLoading] = useState(false);

  useEffect(()=>{
    const getAuthors = async()=>{
      setIsLoading(true);

      try{
        
        const response = await axios.get(`${myUrl}/api/users`)
        setAuthors(response.data);
      }
      catch(err){
        console.log(err)
      }
      setIsLoading(false);
    }
    getAuthors();


  })
  if(isLoading){
    return <Loader/>
  }
    

  return (
    <section className="authors">
     {authors.length > 0 ?  <div className="container authors_container">
        {
          authors.map(({_id : id , avatar , name , posts})=>{
            return <Link key={id} className='author' to={`/posts/users/${id}`}>
              <div className="author_avatar">
                <img src = {`${myUrl}/uploads/${avatar}`} alt={`Image of ${name}`} />
              </div>
              <div className="author_info">
                <h4>{name}</h4>
                <p>{posts} posts</p>
              </div>
            </Link>
          })
        }
      </div> : <h2 className='center'>No Authors found</h2>
      }
    </section>
  )
}

export default Authors;