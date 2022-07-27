import { React, useState } from "react";
import { Link, useParams } from "react-router-dom";
import "../assets/css/flashcard.css"

// export default function Flashcard(props) {
//   const [flip, setFlip] = useState(false);
//   const { userId } = useParams();
//   const { collectionId } = useParams();
//   console.log(props);
const Flashcard = ({ flashcard }) => {
  const [flip, setFlip] = useState(false);

  return (
    <>
      <div className={`card ${flip ? 'flip' : ''}`} onClick={() => setFlip(!flip)}>
        {flip ? flashcard.back : flashcard.front}
        <div className="front">
        <h3>{flashcard.title}</h3>
           <p>{flashcard.front}</p> 
        </div>
        <div className="back"><p>{flashcard.back}</p></div>
      </div>
    </>
  );
};
export default Flashcard;
// }
