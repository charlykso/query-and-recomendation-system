import React, { useState } from 'react'

const useCreate = () => {
  const [Error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(null)
    const [responseData, setResponseData] = useState(null)

    const createUser = async (url, formData, jwt) => {
        setIsLoading(true)
        setError(null)

        const response = await fetch(url, {
        method: 'POST',
        headers: {
            Authorization: 'Bearer ' + jwt,
        },
        body: formData,
        })
        try {
        const data = await response.text()
        // console.log(data);
        if (!response.ok) {
            setIsLoading(false)
            if (response.status === 401) {
            setError('unauthorised')
            } else {
            setError(data)
            }
        } else if (response.ok) {
            setIsLoading(false)
            setResponseData(data)
        }
        } catch (error) {
        setError(error.message)
        }
    }
    // console.log(Error);
    return { createUser, isLoading, Error, responseData }
}

export default useCreate
