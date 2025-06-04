import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import authService from "./appwrite/auth.js"
import { login, logout } from "../app/authSlice.js";
import { Header, Footer, Loader } from "./components/index.js"
import { Outlet } from "react-router-dom";

function App() {
  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch()

  console.log("re-render", Date.now())

  useEffect(() => {
    authService.getCurrentUser()
      .then((userData) => {
        if (userData) {
          dispatch(login({ userData }))
        } else {
          dispatch(logout())
        }
      })
      .catch(err => console.log(err))
      .finally(() => setLoading(false))
  }, [])

  // conditional rendering
  if (loading) {
    // return <Loader />
    return <div>Loading...</div>
  }

  return (
    <>
      <Header />
      <div className="min-h-[80vh]">
      <Outlet />
      </div>
      <Footer />
    </>
  )

}

export default App;