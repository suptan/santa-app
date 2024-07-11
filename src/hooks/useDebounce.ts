import { useState, useEffect } from "react";

function useDebounce<T = any>(value: T, delay = 300) {
  const [debouncedValue, setDebounceValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebounceValue(value);
    }, delay);

    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);
  
  return debouncedValue
}

export { useDebounce };
