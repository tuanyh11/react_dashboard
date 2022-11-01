import { useState } from "react"

export const useBase64 = () => {
    const [base64, setBase64] = useState('')
    const [error, setError] = useState('')
    const convertToBase64 = (file) => new Promise((resolve, reject) => {
        const fileReader = new FileReader()
        if(!file) {
            setError("you must provide a file")
        }

        fileReader.readAsDataURL(file)

        fileReader.onload =() => resolve(fileReader.result)
    
        fileReader.onerror =(error) => reject(error)
    })

    const handleCreateBase64 = async (e) => {
        const file = e.target.files[0]
       try {
        const newBase64 = await convertToBase64(file)
        setBase64(newBase64)
       } catch (error) {
        setError(error)
       }
    }

    const handleClear = (e) => setBase64(null)
    

    return {
        file: base64,
        handleCreateBase64: handleCreateBase64,
        errors: error,
        handleClear: handleClear
    }
}