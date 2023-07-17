import React, { useContext } from 'react'
import axios from 'axios'
import { Context, server } from '../index.js'



function Profile() {
  const {isAuthenticated, setIsAuthenticated, loading, setLoading, user, setUser} = useContext(Context)

  return (
    <div className='profile-container'>
      <h2>Profile Details</h2>
      <div className="profile-info">
        <p>Name - {user.name} </p>
        <p>Email - {user.email} </p>
        <p>Created at - {user.createdAt} </p>
      </div>
    </div>
  )
}

export default Profile