// usedebounce method
// it is a method to delay the api call after some interval

import { useEffect, useState } from "react"

export const useDebounce = (input, delay = 300) => {
    const [debounce, setDebounce] = useState("")

    useEffect(() => {
        const id = setTimeout(() => setDebounce(input), delay)
        return () => clearTimeout(id)
    }, [input, delay])

    return debounce
}