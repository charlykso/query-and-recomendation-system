import React, { useEffect, useState } from 'react'

const useFetch = (url) => {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
      const abortCont = new AbortController()
      fetch(url, {
        method: 'GET'
      })
      .then((res) => {
        if (!res.ok) {
            if (res.status == 401) {
                throw Error('Unauthorized')
            }else {
                throw Error('could not fetch the data for the resource')
            }
        }
        return res.json()
      })
      .then((data) => {
        setData(data)
        setIsLoading(false)
        setError(null)
      })
      .catch((err) => {
        setIsLoading(false)
        setError(err.message)
      });
    
      return () => abortCont.abort()
    }, [url])
    
  return {data, isLoading, error}
}

export default useFetch
