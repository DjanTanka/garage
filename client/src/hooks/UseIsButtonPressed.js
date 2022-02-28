import { useState, useEffect } from "react";

const useIsButtonPressed = (arr) => {
  const [flag, setFlag] = useState<boolean>(false);
  
  const addFunc = (key) => {
    arr.forEach((item) => {
      if (key === item) {
        const filteredArr = keysPressed.find(function (element) {
          return element === item;
        });

        if (!filteredArr) {
          keysPressed.push(key);
        }
        if (keysPressed.length === arr.length) {
          setFlag(true);
        } else setFlag(false);
      }
    });
  };

  const removeFunc = (key) => {
    const index = keysPressed.indexOf(key);
    if (index !== -1) {
      keysPressed.splice(index, 1);
    }
    if (keysPressed.length !== arr.length) setFlag(false);
  };

  useEffect(() => {
    window.addEventListener("keydown", ({ key }) => {
      addFunc(key);
    });

    window.addEventListener("keyup", ({ key }) => {
      removeFunc(key);
    });

    return () => {
      window.removeEventListener("keydown", ({ key }) => {
        addFunc(key);
      });

      window.removeEventListener("keyup", ({ key }) => {
        removeFunc(key);
      });
    };
  }, []);

  return flag;
};

export default useIsButtonPressed;
