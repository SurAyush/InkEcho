import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter } from 'react-router-dom'
import { RouterProvider } from'react-router-dom'
import 'flowbite'
import './index.css'
import UserProvider from './context/UserContext'
import Layout from './components/Layout'
import Home from './pages/Home'
import Error from './pages/Error'
import AuthorPosts from './pages/AuthorPosts'
import Authors from './pages/Authors'
import CategoryPosts from './pages/CategoryPosts'
import CreatePost from './pages/CreatePost'
import EditPost from './pages/EditPost'
import Dashboard from './pages/Dashboard'
import Login from './pages/Login'
import Logout from './pages/Logout'
import Register from './pages/Register'
import UserProfile from './pages/UserProfile'
import PostDetails from './pages/PostDetails'
import DeletePost from './pages/DeletePost'

const router = createBrowserRouter([
  {
    path: '/',
    element: <UserProvider> <Layout /> </UserProvider>,
    errorElement: <Error />,
    children:[
      {index: true, element: <Home />},
      {path:"register", element: <Register />},
      {path:"login", element: <Login />},
      {path:"logout", element: <Logout />},
      {path:"myprofile", element: <UserProfile />},
      {path:"myposts", element:<Dashboard/>},
      {path:"authors", element: <Authors />},
      {path:"posts/authors/:id", element: <AuthorPosts />},
      {path:"posts/category/:category", element: <CategoryPosts />},
      {path:"posts/create", element: <CreatePost />},
      {path:"posts/:id", element: <PostDetails />},
      {path:"posts/:id/edit", element: <EditPost />},
      {path:"posts/:id/delete", element: <DeletePost />},
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>,
)
