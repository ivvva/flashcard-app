import React, { useState, useContext } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'

export default function NewCollection() {
    const [title, setTitle] = useState('');
	const [errorMessage, setErrorMessage] = useState(undefined);

    const navigate = useNavigate()
    const { userId } = useParams()
    
    const handleSubmit = e => {
        e.preventDefault()
		const requestBody = { title }
		axios.post('http://localhost:5005/api/auth/:userId/newCollection', requestBody)
        .then(response => {
            const newCollectionId = response.data._id
				navigate(`/${userId}/${newCollectionId}/new-card`)
			})
			.catch(err => {
				const errorDescription = err.response.data.message
				setErrorMessage(errorDescription)
			})
	}

    const handleTitle= e => setTitle(e.target.value)
  return (
      <>
   <h1>You'll be able to create a new collection here</h1>
			<form onSubmit={handleSubmit}>

				<label htmlFor="title">Title: </label>
				<input type="text" value={title} onChange={handleTitle} />

				<button type="submit">Add cards</button>
			</form>

			{errorMessage && <h5>{errorMessage}</h5>}
		</>
  )
}
