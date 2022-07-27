import React from 'react'
import { Link, useParams } from 'react-router-dom'
import go from "../assets/go.png"
import "../assets/css/myCollections.css";

export default function Collection(props) {
    console.log(props)
    const { userId } = useParams()
    const collectionId = props.collection._id
  return (
    <div className='collection-container'>
      <div className='title'>
        {props.collection.title}
      </div>
      <div className='card-number'>
        {props.collection.flashcardNumber} 
        <button className="go"><Link to={`/${userId}/${collectionId}/train`}><img className="go" src={go}/></Link></button>
      </div>
    </div>
  )
}
