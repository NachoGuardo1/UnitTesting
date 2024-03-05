import { InputAdornment, Menu, MenuItem, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import { ProductsService } from "../services/ProductsService";

export const SearchApp = () => {
  const [valueSearch, setValueSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [menu, setMenu] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const timerId = setTimeout(() => {
      if (valueSearch.trim() !== "") {
        getResults(valueSearch);
        setMenu(true);
      }
    }, 2500);
    return () => clearTimeout(timerId);
  }, [valueSearch]);

  const getResults = async (value) => {
    try {
      const resp = await ProductsService.GET_QUERY(value);
      setSearchResults(resp.data.products);
    } catch (error) {
      setSearchResults([]);
      console.log(error);
    }
  };
  const truncateTitle = (title, maxLength) => {
    if (title.length > maxLength) {
      return title.substring(0, maxLength) + "...";
    }
    return title;
  };

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setValueSearch(value);
  };

  const handleClick = (option) => {
    navigate(`/details/${option._id.toString()}`);
    setMenu(false);
    setValueSearch("");
  };

  const AnchorElClick = (e) => {
    setAnchorEl(e.target);
  };
  return (
    <>
      <TextField
        data-testid="search-field"
        type="search"
        variant="outlined"
        value={valueSearch}
        onChange={handleSearchChange}
        onClick={AnchorElClick}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon sx={{ display: { xs: "none", md: "flex" } }} />
            </InputAdornment>
          ),
        }}
      />
      <Menu
        anchorEl={anchorEl}
        open={menu}
        onClose={() => setMenu(false)}
        sx={{ width: "250px" }}
        data-testid="menu-search"
      >
        {searchResults.length === 0 ? (
          <MenuItem>No options</MenuItem>
        ) : (
          searchResults.map((result) => (
            <MenuItem key={result._id} onClick={() => handleClick(result)}>
              {truncateTitle(result.title, 20)}
            </MenuItem>
          ))
        )}
      </Menu>
    </>
  );
};
