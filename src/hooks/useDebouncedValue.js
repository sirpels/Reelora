import { useEffect, useState } from 'react'

function useDebouncedValue(value, delay = 450) {
  const [debouncedValue, setDebouncedValue] = useState(value)

  useEffect(() => {
    const timeoutId = setTimeout(() => setDebouncedValue(value), delay)
    return () => clearTimeout(timeoutId)
  }, [delay, value])

  return debouncedValue
}

export default useDebouncedValue