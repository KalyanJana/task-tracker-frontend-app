import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { Navigate } from 'react-router-dom';
import { Context, server } from '../index.js';
import '../components/Todoform.css'
import Todoform from '../components/Todoform';


function Home() {

  const {isAuthenticated, user, setUser, items, setItems, loading, setLoading } = useContext(Context)

  useEffect(() => {
    const saveItems = async () => {
      try {
        console.log("Sending items :", items)

        // Check if items array is empty
        if (items.length === 0) {
          console.log("Items array is empty. Skipping API call.");
          return;
        }


        await axios
          .post(`${server}/items/item`, {items}, {
            withCredentials: true,
          })
          .then(res=>{
            console.log("Item feached after save :", res)
          })
          .catch((error)=>{
            console.log(error); 
          })
      } catch (error) {
        console.log(error); 
      }
    };

    saveItems();
  }, [items]);

  if (!isAuthenticated ) return (<Navigate to={"/login"} />)

  // console.log("Fetch items are :", items)


  return (
    <div className='home'>
      {loading && <p className='loading'>Loading..</p>}

      {!loading && items.map((item) => (
        <Todoform key={item._id} item={item} />
      ))}
      

    </div>
  );
}

export default Home;
