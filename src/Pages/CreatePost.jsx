import React, { useState ,useContext, useEffect } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { UserContext } from '../Context/userContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import { myUrl } from '../urls';

const CreatePost = () => {
  const [title , setTitle] = useState('');
  const [category , setCatgeory] = useState('Uncategorized');
  const [description , setDescription] = useState('');
  const [thumbnail , setThumbnail] = useState('');
  const navigate = useNavigate(); 
  const {currentUser} = useContext(UserContext);
  const token = currentUser?.token;

  //redirect to login page for any user who isn't logged in

  useEffect(()=>{
    if(!token){
      navigate('/login')
    }
  } , [])

  const modules = {
    toolbar : [
     [ { 'header' : [1,2,3,4,5,6,false]}],
     [ 'bold' , 'italic' , 'underline' , 'strike' , 'blockquote'],
     [ {'list' : 'ordered'}, {'list' : 'bullet'}, {'indent' : '-1'}, {'indent' : '+1'}, {'link' : 'image'}, ],
     ['clean']
    ],
  }

  const formats = [
    'header',
    'bold' , 'italic' , 'underline' , 'strike' , 'blockquote',
    'list' , 'bullet' , 'indent',
    'link' , 'image'
  ]

  const POST_CATEGORIES = ['Agriculture' , "Business" , "Education" , "Entertainment" , "Art" , "Investment" , "Uncategorized" , "Weather"];

  const [error , setError] = useState('')
  const createPost = async(e)=>{
    e.preventDefault();
    const postData = new FormData();
    postData.set('title' , title);
    postData.set('category' , category);
    postData.set('description' , description);
    postData.set('thumbnail' , thumbnail);

    try {
      const response = await axios.post(`${myUrl}/api/posts/create` , postData ,  {headers : {
        Authorization : `Bearer ${token}`
      }})
     
      

      console.log(await response.data)
      console.log(response.status)
      if(response.status == 201){
        return navigate('/')
      }

      if(await response.data.error){
        setError(response.data.error)
      }
    } catch (err) {
      // setError(err.response.data.message)
      setError(err.response)
    }
  }



  return (


    <section className="create-post">
      <div className="container">
        <h2>Create Post</h2>
       {error && <p className="form_error-message">
         {error}
        </p>}
        <form action="" className="form create-post_form" onSubmit={createPost}>
          <input type="text" placeholder='Title' value={title} onChange={e => setTitle(e.target.value)} />

          <select name="category" value={category} onChange={e => setCatgeory(e.target.value)}>
            {
              POST_CATEGORIES.map((cat) => <option key={cat}>{cat}</option>)
            }
              </select>

              <ReactQuill className='q1-editor' modules={modules} formats={formats} value={description} onChange={setDescription}/>
              
            <input type="file" onChange={e => setThumbnail(e.target.files[0])} accept='png , jpg , jpeg'/>

            <button type="submit" className='btn primary'>Create</button>
        
        </form>
      </div>
    </section>
  )
}

export default CreatePost