import React, { useContext, useState } from 'react'
import { Link, Navigate } from 'react-router-dom'
import { Context, server } from '../index.js'
import axios from 'axios'
import { toast } from 'react-hot-toast'

function Login() {

  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')
  const { isAuthenticated, setIsAuthenticated, loading, setLoading, user, setUser, items, setItems} = useContext(Context)

  const submitHandler = (e) =>{
    e.preventDefault()

    const userEntry = {
      email,
      password
    }
    axios.post(server + '/users/login', {
      email,
      password
    },{
      withCredentials:true,
      headers:{
        "Content-Type" :"application/json"
      },
    })
      .then(res=>{
        console.log(res.data.message)
        console.log(res)
        setUser(res.data.user)
        toast.success("Logged in Successfully!!")
        return fetchItems()
      })
      .catch(err=>{
        console.log(err)
        setIsAuthenticated(false)
        setLoading(true)
      })
    setEmail('')
    setPassword('')
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

  if(isAuthenticated) return (<Navigate to={"/"} />)

  return (
    <div  className='login--page'>
      <h1>Task Tracker</h1>
      <form action=""className='form' onSubmit={submitHandler} >
        <div className='form-control'>
          <input 
            type="text" 
            placeholder='Enter Email Id'
            value={email}
            onChange={e=>setEmail(e.target.value)}
          />
        </div>
        <div className='form-control'>
          <input 
            type="password" 
            placeholder='password'
            value={password}
            onChange={e=>setPassword(e.target.value)}
          />
        </div>
        <input style={{background : "rgb(13, 140, 243)" }} type="submit" value="Login" className='btn btn-block'/>
      </form>
      <div>Don't have an account ? <Link to={"/register"}>Register</Link></div>
    </div>
   
  )
}

export default Login