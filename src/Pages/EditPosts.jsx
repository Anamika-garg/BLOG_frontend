import React, { useState , useEffect , useContext } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useNavigate ,useParams } from 'react-router-dom';
import { UserContext } from '../Context/userContext';
import axios from 'axios';


const EditPosts = () => {
  const [title , setTitle] = useState('');
  const [category , setCatgeory] = useState('Uncategorized');
  const [description , setDescription] = useState('');
  const [thumbnail , setThumbnail] = useState('');
  const [error , setError] = useState('');

  const {id} = useParams();

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

  const POST_CATEGORIES = ['Agriculture' , "Business" , "Education" , "Entertainment" , "Art" , "Investment" , "Uncategorized" , "Weather"]


  const navigate = useNavigate(); 
  const {currentUser} = useContext(UserContext);
  const token = currentUser?.token;

  //redirect to login page for any user who isn't logged in

  useEffect(()=>{
    if(!token){
      navigate('/login')
    }
  } , [])


  useEffect(()=>{
    const getPost = async()=>{
      try {
        // const response = await axios.get(`http://localhost:5000/api/posts/${id}`);
        const response = await axios.get(`https://anamika-blog-backend.vercel.app/api/posts/${id}`);
        setTitle(response.data.title)
        setDescription(response.data.description)
        setCatgeory(response.data.category)

        if(await response.data.error){
          setError(response.data.error)
        }
      } catch (error) {
        console.log(error)
        setError(error)
      }
    }

    getPost()
  }, [])


  const editPost =async(e)=>{
    e.preventDefault();
    const postData = new FormData();
    postData.set('title' , title);
    postData.set('category' , category);
    postData.set('description' , description);
    postData.set('thumbnail' , thumbnail);

    try {
      const response = await axios.patch(`http://localhost:5000/api/posts/${id}` , postData , {withCredentials : true , headers : {
        Authorization : `Bearer ${token}`
      }})

      console.log(await response.data)
      console.log(response.status)
      if(await response.data.error){
        setError(response.data.error)
      }

      if(!await response.data.error){
          return navigate('/')
      }
      // if(response.status == 200){
      // }

    } catch (err) {
      setError(err.response.data.message)
    }
  }
  return (
    <section className="create-post">
      <div className="container">
        <h2>Edit Post</h2>
       {error && <p className="form_error-message">
          {error}
        </p>}
        <form action="" onSubmit={editPost} className="form create-post_form">
          <input type="text" placeholder='Title' value={title} onChange={e => setTitle(e.target.value)} />

          <select name="category" value={category} onChange={e => setCatgeory(e.target.value)}>
            {
              POST_CATEGORIES.map((cat) => <option key={cat}>{cat}</option>)
            }
              </select>

              <ReactQuill className='q1-editor' modules={modules} formats={formats} value={description} onChange={setDescription}/>
              
            <input type="file" value={thumbnail} onChange={e => setThumbnail(e.target.files[0])} accept='png , jpg , jpeg'/>

            <button type="submit" className='btn primary'>Update</button>
        
        </form>
      </div>
    </section>
  )
}

export default EditPosts;

