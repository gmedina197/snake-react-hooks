import { useState, useEffect } from 'react';

function useKeyPress(targetKey) {
  // State for keeping track of whether key is pressed
  const [keyPressed, setKeyPressed] = useState(false);

  // If pressed key is our target key then set to true
  function downHandler({ key, keyCode }) {
    if (key === targetKey || targetKey === keyCode) {
      setKeyPressed(true);
    }
  }

  function keyCodeArrayHandler(evt) {
    for (let i = 0; i < targetKey.length; i++) {
      const keyCode = targetKey[i];

      if (keyCode === evt.keyCode) {
        setKeyPressed(keyCode)
      }
    }
  }

  // If released key is our target key then set to false
  const upHandler = ({ key, keyCode }) => {
    if (key === targetKey || targetKey === keyCode) {
      setKeyPressed(false);
    }
  };

  // Add event listeners
  useEffect(() => {
    window.addEventListener('keydown', keyCodeArrayHandler);
    //window.addEventListener('keyup', upHandler);
    // Remove event listeners on cleanup
    return () => {
      window.removeEventListener('keydown', keyCodeArrayHandler);
      //window.removeEventListener('keyup', upHandler);
    };
  }, []); // Empty array ensures that effect is only run on mount and unmount

  return keyPressed;
}

export default useKeyPress;