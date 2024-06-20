import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter } from 'react-router-dom'
import { RouterProvider } from'react-router-dom'
import 'flowbite'
import './index.css'
import Layout from './components/Layout'
import Home from './pages/Home'
import Error from './pages/Error'
import AuthorPosts from './pages/AuthorPosts'
import Authors from './pages/Authors'
import CategoryPosts from './pages/CategoryPosts'
import CreatePost from './pages/CreatePost'
import Dashboard from './pages/Dashboard'
import Login from './pages/Login'
import Logout from './pages/Logout'
import Register from './pages/Register'
import UserProfile from './pages/UserProfile'
import EditPost from './pages/EditPost'
import PostDetails from './pages/PostDetails'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: <Error />,
    children:[
      {index: true, element: <Home />},
      {path:"register", element: <Register />},
      {path:"login", element: <Login />},
      {path:"logout", element: <Logout />},
      {path:"profile/:id", element: <UserProfile />},
      {path:"author", element: <Authors />},
      {path:"create", element: <CreatePost />},
      {path:"posts/:id", element: <PostDetails />},
      {path:"posts/users/:id", element: <AuthorPosts />},
      {path:"posts/categories/:category", element: <CategoryPosts />},
      {path:"myposts/:id", element:<Dashboard/>},
      {path:"myposts/:id/edit", element:<EditPost/>}
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>,
)
