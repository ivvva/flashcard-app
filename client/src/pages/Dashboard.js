import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import "../assets/css/dashboard.css"
import Collection from "./Collection";

export default function Dashboard() {
  const { userId } = useParams()
  const [collections, getCollections] = useState([]);
  const [shownCollection, setShownCollection] = useState(0)

  useEffect(() => {
    const getAllCollections = async () => {
      const res = await axios.get(
        `/api/user/${userId}/myCollections`
      );
      getCollections(res.data.collections);
    };
    getAllCollections();
  }, []);

  const handleShownCollection = () => {
    setShownCollection((prev) => (prev + 1) % collections.length);
  };

  return (
    <>
      <div className="sidenav">
      <Link className="sidenav-link" to={`/${userId}/new-collection`}>New Collection</Link>
      <Link className="sidenav-link" to={`/${userId}/my-collections`}>My Collections</Link>
      <Link className="sidenav-link" to={`/`}>Log Out</Link>
      </div>
      <h1 className="dashboard">Dashboard</h1>
      <div className="recent"> <h3 style={{background: "transparent"}}> Recent Collection</h3>
      <div>
      <Collection collection={collections[shownCollection] || {}}></Collection>
      </div>
    </div>
    </>
  );
}
