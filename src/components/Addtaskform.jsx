import React, { useState, useEffect, useRef, useContext } from 'react';
import { FaTrash } from 'react-icons/fa';
import axios from 'axios';
import { Context, server } from '../index.js';
import useClickOutside from './useClickOutside';

function AddTaskForm({ task, parentId }) {

  const [textValue, setTextValue] = useState(task.task || '');
  const [bgColor, setBgColor] = useState(task.taskBgColor);
  const [textHeight, setTextHeight] = useState(task.taskHeight);
  const [textColor, setTextColor] = useState('#000'); 

  const [clickedTaskBox, setClickedTaskBox] = useState(false);
  const inputRef = useRef(null);
  

  const { isAuthenticated, items, setItems, user, setUser } = useContext(Context);


  const colors = [
    '#ffffff', '#fe6f5e', '#ff6700', '#ffff31',
    '#00ff00', '#89cff0', '#dda0dd', '#6e7f80',
    '#a52a2a', '#e25822', '#ed9121', '#76ff7a',
    '#2e8b57', '#0892d0', '#9932cc', '#79443b',
  ];

  const handleClickOutside = () => {
    setClickedTaskBox(false);
    const textarea = inputRef.current.querySelector('textarea');
    textarea.style.height = 'auto';
    textarea.style.height = `${textarea.scrollHeight}px`;
  };

  useClickOutside(inputRef, handleClickOutside);

  const handleColorClick = (color) => {
    setBgColor(color);
    updateTasksHandler(color); // Pass the color to updateTasksHandler
  };

  const deleteHandler = () => {
    setClickedTaskBox(false);
    const currentItem = items.find((item) => item._id === parentId);
    if (currentItem) {
      const updatedTasks = currentItem.tasks.filter((taskObj) => taskObj._id !== task._id);
      const updatedItems = items.map((item) => {
        if (item._id === parentId) {
          return { ...item, tasks: updatedTasks };
        }
        return item;
      });
      setItems(updatedItems);
    }
  };

  const updateTasksHandler = (updatedBgColor) => {
    const currentItem = items.find((item) => item._id === parentId);
    if (currentItem) {
      const updatedTasks = currentItem.tasks.map((taskObj) => {
        if (taskObj._id === task._id) {
          return {
            ...taskObj,
            task: textValue,
            taskBgColor: updatedBgColor,
            taskHeight: (textValue.length/20)*5,
          };
        }
        return taskObj;
      });

  const updatedItems = items.map((item) => {
      if (item._id === parentId) {
          return { ...item, tasks: updatedTasks };
        }
        return item;
      });
      setItems(updatedItems);
    }
  };

  const handleInput = (event) => {
    const textarea = event.target;
    setTextColor('#000')
    setTextValue(textarea.value);
  };

  const handleFocus = () => {
    setClickedTaskBox(true);
    const textarea = inputRef.current.querySelector('textarea');
    textarea.style.height = '8em';
  };

  useEffect(() => {
    const textarea = inputRef.current.querySelector('textarea');

    setTextHeight(textarea.scrollHeight);
  }, [textValue]);

  useEffect(() => {
    // Update the text color based on the background color
    setTextColor(['#ffffff','#ffff31','#00ff00',  '#76ff7a'].includes(bgColor) ? '#000000': '#FFFFFF')
     
  }, [bgColor]);
  

  return (
    <div className='add-task-form' ref={inputRef} onBlur={updateTasksHandler}>
      <div className="textarea-wrapper" style={{ backgroundColor: bgColor }}>
        <div className={clickedTaskBox ? 'delete-icon' : 'remove'} style={{ backgroundColor: bgColor }}>
          <FaTrash onClick={deleteHandler} />
        </div>
        <textarea
          onInput={handleInput}
          onFocus={handleFocus}
          style={{
            padding: clickedTaskBox ? '1rem': '1.3rem',
            cursor: clickedTaskBox ? 'text' : 'grab',
            overflow: clickedTaskBox ? 'visible' : 'hidden',
            backgroundColor: bgColor,
            height: `${textHeight}px`,
            borderRadius : clickedTaskBox ? '0px' : '0.7rem',
            color: textColor || '#000',
          }}
          value={textValue}
          rows={1}
        />
      </div>

      <div className={clickedTaskBox ? 'color-picker' : 'remove'}>
        <div className="color-box">
          {colors.map((color, index) => (
            <div
              key={index}
              className={`color-option`}
              style={{ backgroundColor: color }}
              onClick={() => handleColorClick(color)}
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default AddTaskForm;
