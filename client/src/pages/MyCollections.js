import { React, useEffect } from 'react'
import axios from "axios";
import { Link, useParams, useNavigate } from "react-router-dom";
import Collection from './NewCollection'

export default function MyCollections() {
  useEffect(() => {
    const getCollections = async () => {
      const res = await axios.get('http://localhost:5005/api/auth/:userId/myCollections')

      console.log(res.data)
    }
    getCollections()
  }, [])
  
  const navigate = useNavigate();
  const { newCollectionId, title, flashcardNumber } = useParams();

  return (
    <div><h1>Here my collections are gonna be displayed</h1></div>
  )
}
