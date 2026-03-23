import { useState } from "react";

export const useArray = (size = 30) => {
  const [array, setArray] = useState([]);

  const generateArray = () => {
    const arr = Array.from({ length: size }, () =>
      Math.floor(Math.random() * 100) + 5
    );
    setArray(arr);
  };

  return { array, setArray, generateArray };
};