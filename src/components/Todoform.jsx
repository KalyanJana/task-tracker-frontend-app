import React, { useState, useContext, useRef, useEffect } from 'react';
import Addtaskform from './Addtaskform';
import { FaPlus, FaTrash } from 'react-icons/fa';
import axios from 'axios';
import { Context, server } from '../index.js';
import { v4 as uuidv4 } from 'uuid'; // Import uuidv4 for generating temporary IDs
import useClickOutside from './useClickOutside';

function Todoform({ item }) {

  const { isAuthenticated, items, setItems, user, setUser } = useContext(Context);
  const [toggle, setToggle] = useState(false);
  const [updatedTitle, setUpdatedTitle] = useState(item.title);
  const inputRef = useRef(null);

  const tasks = items.find((i) => i._id === item._id)?.tasks || [];

  const addNewTasAtFirst = () => {
    const updatedTasks = [...tasks];

    const newTask ={ 
        task: '', 
        taskBgColor: '#fff',
        _id: uuidv4() 
    }
    
    updatedTasks.splice(0,0, newTask)

    const updatedItems = items.map((i) => (i._id === item._id ? { ...i, tasks: updatedTasks } : i));

    setItems(updatedItems);
  };

  const addNewTaskAtEnd = (e) => {
    // e.stopPropagation();
    const updatedTasks = [
      ...tasks, 
      { task: '', taskBgColor: '#fff', _id: uuidv4() }
    ];
    const updatedItems = items.map((i) => (i._id === item._id ? { ...i, tasks: updatedTasks } : i));
    
    setItems(updatedItems);
  };

  const itemTitleChangehandler = (e) => {
    setUpdatedTitle(e.target.value);
  };

  const focusHandler = () => {
    setToggle(true);
  };

  const deleteItemHandler = () => {
    const newItems = items.filter((itemObj) => itemObj._id !== item._id);
    setItems(newItems);
  };

  const updateTitlehandler = () => {
    const updatedItems = items.map((itemObj) => {
      if (itemObj._id === item._id) {
        return { ...itemObj, title: updatedTitle };
      }
      return itemObj;
    });

    setItems(updatedItems);
  };

  const handleClickOutside = () => {
    setToggle(false);
  };
  useClickOutside(inputRef, handleClickOutside);


  const addNewItemHandler = async() => {
    const newItem ={
      title: '',
      isItAddColumn : false,
      tasks : [],
      user : user._id,
      _id: uuidv4(),
    }
    const updatedItems = [...items]
    updatedItems.splice(updatedItems.length - 1, 0, newItem); //inserting at the 2nd last.

    setItems(updatedItems)
  };

  const generateId = () => {
    const characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let id = '';
  
    for (let i = 0; i < 24; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      id += characters[randomIndex];
    }
  
    return id;
  };

  return (
    <div className='todo-form' ref={inputRef}>
      
      {!item.isItAddColumn && 
        <div className='todo-form-header'>
          <input
            type='text'
            value={updatedTitle}
            onChange={itemTitleChangehandler}
            onFocus={focusHandler}
            onBlur={updateTitlehandler}
          />
          {toggle ? (
            <FaTrash className='todo-trash' onClick={deleteItemHandler} />
          ) : (
            <FaPlus className='todo-plus' onClick={addNewTasAtFirst} />
          )}
        </div>
      }
      
      {tasks.map((task) => (
        <Addtaskform key={task._id} task={task} parentId={item._id} />
      ))}

      {
      item.isItAddColumn ? 
      <h4 className='todo-form-btn' onClick={addNewItemHandler}>
       add column...
      </h4> 
       : 
       <div className='todo-form-btn' onClick={addNewTaskAtEnd}>
        add task card...
      </div> 
      }
     
    </div>
  );
}

export default Todoform;
