import { React, useState } from "react";
import { Link, useParams } from "react-router-dom";
import go from "../assets/go.png";
import "../assets/css/myCollections.css";

export default function Collection(props) {
  const [shownCard, setShownCard] = useState(0);
  const { userId } = useParams();
  const collectionId = props.collection._id;

  const handleShownCardOnClick = () => {
    setShownCard((prev) => (prev + 1) % props.collection.flashcards.length);
  };
  return (
    <div className="collection-container">
      <div className="title">{props.collection.title}</div>
      <div className="card-number">
        {props.collection.flashcardNumber}
        <button className="go">
          <Link to={`/${userId}/${collectionId}/train`}>
            <img className="go" alt="gato" src={go} />
          </Link>
        </button>
      </div>
    </div>
  );
}
