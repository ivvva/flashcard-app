import { React, useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams, useNavigate } from "react-router-dom";
import go from "../assets/go.png";
import Collection from "./Collection";

export default function MyCollections() {
  const { userId } = useParams();
  const [collections, getCollections] = useState([]);

  useEffect(() => {
    const getAllCollections = async () => {
      const res = await axios.get(
        `http://localhost:5005/api/user/${userId}/myCollections`
      );
      getCollections(res.data.collections);
      console.log(collections);
    };
    getAllCollections();
  }, []);

  const navigate = useNavigate();
  const { newCollectionId, title, flashcardNumber } = useParams();

  return (
    <>
      {collections.map((collection) => (
        <Collection collection={collection}></Collection>
      ))}
    </>
  );
}
