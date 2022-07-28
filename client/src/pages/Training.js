import { React, useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Flashcard from "./Flashcard";
import "../assets/css/flashcard.css";

export default function Training() {
  const { userId } = useParams();
  const { collectionId } = useParams();
  const [flashcards, getFlashcards] = useState([]);

  useEffect(() => {
    const getAllFlashcards = async () => {
      const res = await axios.get(
        `http://localhost:5005/api/user/${userId}/collection/${collectionId}/training`
      );
      getFlashcards(res.data.flashcards);
      console.log(flashcards);
      console.log(res.data.flashcards);
    };
    getAllFlashcards();
  }, []);

  const [ currentFlashcard, setCurrentQuestion ] = useState(0)
  return (
    <div className="container">
      {flashcards.map((flashcard) => (
        <Flashcard flashcard={flashcard}></Flashcard>
      ))}
    </div>
  );
}
