import React, { createContext, useState } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

// export const server ="http://localhost:4000"
export const server ="https://kanbana-apps.onrender.com/"

export const Context = createContext()


const AppWrapper = () =>{
  const [isAuthenticated, setIsAuthenticated] =useState(false)
  const [loading, setLoading] =useState(false)
  const [user, setUser] = useState({})
  const [items, setItems] = useState([])

  return(
    <Context.Provider value = {{
      isAuthenticated,
      setIsAuthenticated,
      loading,
      setLoading,
      user, 
      setUser,
      items,
      setItems
    }}>
      <App />
    </Context.Provider>
  )
}
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AppWrapper />
  </React.StrictMode>
);

