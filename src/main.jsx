import { createRoot } from 'react-dom/client'
import './index.css'
import { Provider } from 'react-redux'
import store from '../app/store.js'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

//all react app pages are here 
import App from './App.jsx'
import Home from './pages/Home.jsx'
import Login from './pages/Login.jsx'
import Signup from './pages/Signup.jsx'
import SingalPost from './pages/SingalPost.jsx'
import AddPost from './pages/AddPost.jsx'
import AllPost from './pages/AllPost.jsx'
import EditPost from './pages/EditPost.jsx'
import NotFound from './pages/404Page.jsx'
import { ProtectedRoute } from './components/index.js'
// https://blogapp-appwrite-gamma.vercel.app/ -> deploy url 

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        path: "/",
        element: <Home />
      },
      {
        path: "/login",
        element: <Login />
      },
      {
        path: "/signup",
        element: <Signup />
      },
      {
        path: "/post/:slug",
        element: <SingalPost />
      },
      {
        path: "/add-post",
        element: <ProtectedRoute> <AddPost /> </ProtectedRoute>
      },
      {
        path: "/all-posts",
        element: <AllPost />
      },
      {
        path: "/edit-post/:slug",
        element: <ProtectedRoute> <EditPost /> </ProtectedRoute>
      },
      {
        path: "*",
        element: <NotFound />
      }
    ]
  }
])

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
)