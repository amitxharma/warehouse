import React, { useState } from "react";
import "../searchSort/SearchSort.css";
import warehouses from "../../warehouses.json";
import { Link } from "react-router-dom";

const SearchSort = () => {
  const [filter, setFilter] = useState({
    name: "",
    city: "",
    cluster: "",
    spaceAvailable: "",
  });

  const [filteredWarehouses, setFilteredWarehouses] = useState(warehouses);
  const [loading, setLoading] = useState(false); // Loading state

  let timeoutId;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "spaceAvailable" && parseFloat(value) < 0) {
      return;
    }
    setFilter({ ...filter, [name]: value });

    // Introduce a delay before filtering the results
    clearTimeout(timeoutId);
    setLoading(true); // Show loading animation
    timeoutId = setTimeout(filterResults, 300); // Assign the value to timeoutId
  };

  const filterResults = () => {
    const newFilteredWarehouses = warehouses.filter((warehouse) => {
      return (
        warehouse.name.toLowerCase().includes(filter.name.toLowerCase()) &&
        warehouse.city.toLowerCase().includes(filter.city.toLowerCase()) &&
        warehouse.cluster
          .toLowerCase()
          .includes(filter.cluster.toLowerCase()) &&
        (filter.spaceAvailable === "" ||
          warehouse.space_available >= parseFloat(filter.spaceAvailable))
      );
    });

    setFilteredWarehouses(newFilteredWarehouses);
    setLoading(false); // Hide loading animation
  };

  const handleReset = () => {
    // setFilter(initialFilterState);
    setFilteredWarehouses(warehouses); // Reset the filtered data
  };

  return (
    <div className="warehouse-search-container">
      <div className="filters">
        <input
          type="text"
          name="name"
          placeholder="Warehouse Name"
          value={filter.name}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="city"
          placeholder="City"
          value={filter.city}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="cluster"
          placeholder="Cluster"
          value={filter.cluster}
          onChange={handleInputChange}
        />
        <input
          type="number"
          name="spaceAvailable"
          placeholder="Space Available (min)"
          value={filter.spaceAvailable}
          onChange={handleInputChange}
        />
        <button className="reset-button" onClick={handleReset}>
          Reset
        </button>
      </div>
      {loading ? (
        <div className="loader"></div>
      ) : (
        <div className="result-list">
          {filteredWarehouses.map((warehouse, index) => (
            <Link
              to={`/warehouse/${warehouse.id}?name=${encodeURIComponent(
                warehouse.name
              )}&city=${encodeURIComponent(
                warehouse.city
              )}&cluster=${encodeURIComponent(
                warehouse.cluster
              )}&space_available=${encodeURIComponent(
                warehouse.space_available
              )}&type=${encodeURIComponent(
                warehouse.type
              )}&code=${encodeURIComponent(
                warehouse.code
              )}&is_registered=${encodeURIComponent(
                warehouse.is_registered
              )}&is_live=${encodeURIComponent(warehouse.is_live)}`}
              key={index}
            >
              <div className="warehouse-item">
                <p
                  style={{
                    fontWeight: "bold",
                    backgroundColor: "#04364A",
                    color: "whitesmoke",
                    padding: "20px",
                    borderRadius: "15px",
                  }}
                >
                  Name: {warehouse.name}
                </p>
                <p>City: {warehouse.city}</p>
                <p>Cluster: {warehouse.cluster}</p>
                <p>Space Available: {warehouse.space_available}</p>
                <p>Type: {warehouse.type}</p>
                <p>Code: {warehouse.code}</p>
                <p>Is Registered: {warehouse.is_registered ? "Yes" : "No"}</p>
                <p>Is Live: {warehouse.is_live ? "Yes" : "No"}</p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchSort;
