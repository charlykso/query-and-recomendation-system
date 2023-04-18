import React, {useState, useEffect} from 'react'

const useFetch = (url) => {
    const [data, setData] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        const abortCont = new AbortController()
        fetch(url, {
        method: 'GET',
        // headers: { Authorization: 'Bearer ' + jwt },
        })
        .then((res) => {
            if (!res.ok) {
            if (res.status === 401) {
                throw Error('Unauthorised')
            }else if(res.status === 404) {
                throw Error('Not found')
            }
            else {
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
        })
        return () => abortCont.abort()
    }, [url])

    return { data, isLoading, error }
}

export default useFetch
