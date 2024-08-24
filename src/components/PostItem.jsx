import React from 'react'
import {Link} from 'react-router-dom';
import PostAuthor from './PostAuthor'
import { myUrl } from '../urls';
const PostItem = ({title , createdAt , description , authorID , category , thumbnail , postID}) => {

  const shortDesc = description.length > 145 ? description.substr(0 , 99) + '...': description ;
  const postTitle = title.length > 30 ? title.substr(0 , 30) + '...': title ;
  return (
    <article className="post" key={postID}>
      <div className="post_thumbnail">
        <img height={280} width={330} src={`${myUrl}/uploads/${thumbnail}`} alt={title}/>
        
      </div>
      <div className="post_content">
        <Link to={`/posts/${postID}`}>
        <h3>{postTitle}</h3>
        </Link>
        <p style={{fontSize : '1rem'}} dangerouslySetInnerHTML={{__html : shortDesc}}/>
        <div className="post_footer">
          <PostAuthor authorID = {authorID} createdAt = {createdAt} />
          <Link className='btn category' to={`/posts/categories/${category}`}>{category}</Link>
        </div>
      </div>
    </article>
  )
}

export default PostItem