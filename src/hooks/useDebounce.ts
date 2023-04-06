import { useEffect, useState } from 'react'

// No devuelve el valor antes de que se oprima la tecla correspondiente

export function useDebounce<T> (value: T, delay = 500) {
  const [debounceValue, setDebounceValue] = useState(value)

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebounceValue(value)
    }, delay)

    return () => { clearTimeout(timer) }
  }, [value, delay])

  return debounceValue
}
