import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Context, server } from '../index.js';
import axios from 'axios';
import toast from 'react-hot-toast'

function Navbar() {

  const {isAuthenticated, setIsAuthenticated, loading, setLoading, user, setUser} = useContext(Context)
     
  const logoutHandler = async ()=>{
      setLoading(true)
      try {
          await axios.get(`${server}/users/logout`,
          {
              withCredentials : true,
          }       
          )
          toast.success("logged Out Successfully")
          console.log('Logout successfully!', isAuthenticated);
          setIsAuthenticated(false)
          setLoading(false)
          setUser({})
          console.log(isAuthenticated)
      } catch (error) {
          toast.error(error.response.data.message)
          setIsAuthenticated(true)
          setLoading(false)
      }
      setIsAuthenticated(false)
  }


  return (
    <div className='navbar'>
      <div>
        <h1>Task Tracker App</h1>
      </div>
      <article className='links'>
        <Link to={"/"} >Home</Link>
        <Link to={"/profile"} >Profile</Link>
        {isAuthenticated ? (
          <button disabled={loading} onClick={logoutHandler}>Logout</button>
        ) : (
          <Link to={"/login"} >Login</Link>
        )}
      </article>
    </div>
  );
}

export default Navbar;
