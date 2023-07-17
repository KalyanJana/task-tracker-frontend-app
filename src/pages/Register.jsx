import React, { useContext, useState } from 'react'
import { Link, Navigate } from 'react-router-dom'
import axios from 'axios'
import { Context, server } from '../index.js'


function Register() {

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const {isAuthenticated, setIsAuthenticated, loading, setLoading, user, setUser, items, setItems} = useContext(Context)

  const submithandler = (e) =>{
    e.preventDefault()
    const newUserDetails ={
      name,
      email,
      password
    }
    setName('')
    setEmail('')
    setPassword('')
    axios
      .post(server + '/users/new',newUserDetails)
      .then(res=>{
        console.log(res.data.message)
        console.log(res.data)
        setUser(res.data.user)
        return fetchItems()
      })
      .catch(err=>{
        console.log(err)
        setIsAuthenticated(false)
        setLoading(true)
      })
  }

  const fetchItems =()=>{
    axios
    .get(`${server}/items/my`,{
      withCredentials:true,
    })
    .then(res=>{
      console.log("Item feached :", res)
      setItems(res.data.items.items)
      setIsAuthenticated(true)
      setLoading(false)
    })
    .catch((error)=>{
      setItems([])
      setIsAuthenticated(false)
      setLoading(true)
    })
  }

  if(isAuthenticated) return <Navigate to={"/"} />

  return (
    <div  className='login--page'>
      <h1>Task Tracker</h1>
      <form action=""className='form' onSubmit={submithandler}>
        <div className='form-control'>
          <input 
            type="text" 
            placeholder='Enter Your Name'
            value={name}
            onChange={(e)=> setName(e.target.value)}
          />
        </div>
        <div className='form-control'>
          <input 
            type="text" 
            placeholder='Enter Email Id'
            value={email}
            onChange={(e)=> setEmail(e.target.value)}
          />
        </div>
        <div className='form-control'>
          <input 
            type="password" 
            placeholder='password'
            value={password}
            onChange={(e)=> setPassword(e.target.value)}
          />
        </div>
        <input style={{background : "rgb(13, 140, 243)" }} type="submit" value="Register" className='btn btn-block'/>
      </form>
      <div>have an account ? <Link to={"/login"}>Login</Link></div>
    </div>
  )
}

export default Register