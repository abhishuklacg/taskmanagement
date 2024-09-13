import React, { useState } from "react";
import { useTaskContext } from "../Context/TaskContext";

const SearchBar: React.FC = () => {
  const { searchByCategory, resetSearch } = useTaskContext();
  const [searchValue, setSearchValue] = useState("");

  const handleSearch = () => {
    if (searchValue) {
      searchByCategory(searchValue);
    }
  };

  const handleReset = () => {
    resetSearch();
    setSearchValue("");
  };

  return (
    <div style={{ marginBottom: "20px" }}>
      <input
        type="text"
        placeholder="Search by category"
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
      />
      <button onClick={handleSearch} style={{ marginLeft: "10px" }}>Search</button>
      <button onClick={handleReset} style={{ marginLeft: "10px" }}>Cancel</button>
    </div>
  );
};

export default SearchBar;
