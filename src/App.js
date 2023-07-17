import Navbar from './components/Navbar'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Home from './pages/Home';
import Profile from './pages/Profile';
import Login from './pages/Login';
import Register from './pages/Register';
import { useContext, useEffect } from 'react';
import { Context, server } from './index.js';
import axios from 'axios';

function App() {

  const {setUser, setItems, items, setIsAuthenticated, setLoading} = useContext(Context)
  
  useEffect(()=>{
    setLoading(true)
    fetchUser()
  },[])

  const fetchUser = ()=>{
    axios
    .get(`${server}/users/my`,{
      withCredentials:true,
    })
    .then(res=>{
      // console.log("user feached :", res)
      console.log(res.data.message)
      setUser(res.data.user)
      return fetchItems()  //return promise from fetchIems
      
    })
    .catch((error)=>{
      setUser({})
      setIsAuthenticated(false)
      setLoading(false)
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
  return (
    <div className="container">
      <Router>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
