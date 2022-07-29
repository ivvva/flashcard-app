import { React, useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import Flashcard from "./Flashcard";
import "../assets/css/flashcard.css";
import next from "../assets/next.png"
import home from "../assets/home.png"

export default function Training() {
  const { userId } = useParams();
  const { collectionId } = useParams();
  const [flashcards, getFlashcards] = useState([]);
  const [shownCard, setShownCard] = useState(0)

  useEffect(() => {
    const getAllFlashcards = async () => {
      const res = await axios.get(
        `/api/user/${userId}/collection/${collectionId}/training`
      );
      getFlashcards(res.data.flashcards);
      console.log(flashcards);
      console.log(res.data.flashcards);
    };
    getAllFlashcards();
  }, []);

  const handleShownCard = () => {
    setShownCard((prev) => (prev + 1) % flashcards.length);
  };

  return (
    <div className="flashcard-container">
    <div>
      <Flashcard flashcard={flashcards[shownCard] || {}}></Flashcard>
    </div>

    <div>
      <div className="next" onClick={handleShownCard}><img src={next} /></div>
      <Link to={`/${userId}/dashboard`}>
		<img src={home} href/> 
		</Link>
    </div>
  </div>
  );
}
