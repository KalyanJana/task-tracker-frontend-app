import { useEffect } from 'react';

const useClickOutside = (ref, handleClickOutside) => {
  useEffect(() => {
    const handleClick = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        handleClickOutside();
      }
    };

    document.addEventListener('mousedown', handleClick);

    return () => {
      document.removeEventListener('mousedown', handleClick);
    };
  }, [ref, handleClickOutside]);
};

export default useClickOutside;
