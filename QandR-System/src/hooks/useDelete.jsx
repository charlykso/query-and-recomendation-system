import React, { useState } from 'react'

export const useDelete = () => {
    const [delError, setDelError] = useState(null)
    const [isLoading, setIsLoading] = useState(null)
    const [responseData, setResponseData] = useState(null)

    const deleteUser = async (url, jwt) => {
        setIsLoading(true)
        setDelError(null)

        const response = await fetch(url, {
        method: 'DELETE',
        headers: {
            Authorization: 'Bearer ' + jwt,
        },
        })
        try {
        const data = await response.text()
        if (!response.ok) {
            setIsLoading(false)
            if (response.status === 401) {
                setDelError('unauthorised')
            } else {
                setDelError(data)
            }
        } else if (response.ok) {
            setIsLoading(false)
            setResponseData(data)
        }
        } catch (error) {
        setDelError(error.message)
        }
    }

    return { deleteUser, isLoading, delError, responseData }
}
