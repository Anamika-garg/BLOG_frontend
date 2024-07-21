import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from './components/Layout.jsx';
import ErrorPage from './Pages/ErrorPage.jsx';
import Home from './Pages/Home.jsx';
import PostDetails from './Pages/PostDetails';
import Register from './Pages/Register.jsx';
import Login from './Pages/Login.jsx';
import UserProfile from './Pages/UserProfile.jsx';
import Authors from './Pages/Authors.jsx';
import CreatePost from './Pages/CreatePost.jsx';
import CategoryPost from './Pages/CategoryPost.jsx';
import AuthorsPosts from './Pages/AuthorsPosts.jsx';
import Logout from './Pages/Logout.jsx';
import EditPosts from './Pages/EditPosts.jsx';
import DeletePost from './Pages/DeletePost.jsx';
import Dashboard from './Pages/Dashboard.jsx';
import UserProvider from './Context/userContext.jsx';

const router = createBrowserRouter([
  {
    path : '/',
    element : <UserProvider><Layout/></UserProvider>,
    errorElement : <ErrorPage/>,
    children : [
      {index : true , element : <Home/>},
      {path : 'posts/:id' , element : <PostDetails/>},
      {path : 'register' , element : <Register/>},
      {path : 'login' , element : <Login/>},
      {path : 'profile/:id' , element : <UserProfile/>},
      {path : 'authors' , element : <Authors/>},
      {path : 'create' , element : <CreatePost/>},
      {path : 'posts/categories/:category' , element : <CategoryPost/>},
      {path : 'posts/users/:id' , element : <AuthorsPosts/>},
      {path : 'posts/:id/edit' , element : <EditPosts/>},
      {path : 'posts/:id/delete' , element : <DeletePost/>},
      {path : 'myposts/:id' , element : <Dashboard/>},
      {path : 'logout' , element : <Logout/>},
    ]
  }
])
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>,
)
