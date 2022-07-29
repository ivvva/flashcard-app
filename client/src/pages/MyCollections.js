import { React, useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Collection from "./Collection";

export default function MyCollections() {
  const { userId } = useParams();
  const [collections, getCollections] = useState([]);

  useEffect(() => {
    const getAllCollections = async () => {
      const res = await axios.get(
        `$/api/user/${userId}/myCollections`
      );
      getCollections(res.data.collections);
    };
    getAllCollections();
  }, []);

  return (
    <>
      {collections.map((collection) => (
        <Collection collection={collection} key={collection._id}></Collection>
      ))}
    </>
  );
}
