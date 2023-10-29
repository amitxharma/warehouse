import React from "react";
import { useParams, useLocation } from "react-router-dom";
import "../WarehouseDetails/WarehouseDetails.css";

const WarehouseDetail = () => {
  const { id } = useParams();
  const { search } = useLocation();

  const urlSearchParams = new URLSearchParams(search);
  const name = urlSearchParams.get("name");
  const city = urlSearchParams.get("city");
  const space_available = urlSearchParams.get("space_available");
  const cluster = urlSearchParams.get("cluster");
  const type = urlSearchParams.get("type");
  const code = urlSearchParams.get("code");
  const is_registered = urlSearchParams.get("is_registered") === "true";
  const is_live = urlSearchParams.get("is_live") === "true";

  return (
    <div className="centered-box">
      <p
        style={{
          fontWeight: "bold",
          backgroundColor: "#04364A",
          color: "whitesmoke",
          padding: "30px",
          borderRadius: "15px",
        }}
      >
        Warehouse Details
      </p>
      <p>ID: {id}</p>
      <p>Name: {name}</p>
      <p>City: {city}</p>
      <p>Cluster: {cluster}</p>
      <p>Space Available: {space_available}</p>
      <p>Type: {type}</p>
      <p>Code: {code}</p>
      <p>Is Registered: {is_registered ? "Yes" : "No"}</p>
      <p>Is Live: {is_live ? "Yes" : "No"}</p>
    </div>
  );
};

export default WarehouseDetail;
