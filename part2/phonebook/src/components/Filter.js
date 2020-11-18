import React from "react";

const Filter = ({ search, handleChange }) => {
    return (
        <>
            <span>Show filter</span><input value={search} onChange={handleChange} />
        </>
    )
}

export default Filter;