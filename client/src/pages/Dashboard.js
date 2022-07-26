import React, { useState, useContext } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";

export default function Dashboard() {
  const { userId } = useParams()
  return (
    <div>
      <h1>This is the dashboard page</h1>
      <Link to={`/${userId}/new-collection`}>New Collection</Link>
      <br></br>
      <Link to='/:userId/my-collections '>My Collections</Link>
    </div>
  );
}
