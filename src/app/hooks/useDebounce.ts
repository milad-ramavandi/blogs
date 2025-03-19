import { useEffect, useState } from 'react'

const useDebounce = (value:string) => {
    const [debouncedValue, setSebouncedValue] = useState("");
    useEffect(() => {
      const timer = setTimeout(() => {
        setSebouncedValue(value);
      }, 500);
    
      return () => {
        clearTimeout(timer)
      }
    }, [value])
    
  return {debouncedValue}
}

export default useDebounce