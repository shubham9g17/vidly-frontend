import React from "react";
const SearchBox = ({ onChange, ...rest }) => {
  return (
    <input
      {...rest}
      style={{ marginBottom: 20 }}
      type="text"
      placeholder="Search..."
      className="form-control"
      onChange={({ currentTarget }) => onChange(currentTarget.value)}
    />
  );
};

export default SearchBox;
