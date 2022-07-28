import React, { useState, useContext } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import "../assets/css/dashboard.css"

export default function Dashboard() {
  const { userId } = useParams()
  return (
    <>
      <div className="sidenav">
      <Link className="sidenav-link" to={`/${userId}/new-collection`}>New Collection</Link>
      <Link className="sidenav-link" to={`/${userId}/my-collections`}>My Collections</Link>
      </div>
      <h1 className="dashboard">Dashboard</h1>
    </>
  );
}
