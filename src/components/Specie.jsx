import React from "react";

const Specie = ({ specie }) => {
  return (
    <div className="card">
      <h3>{specie.name}</h3>
      <p>Classification - {specie.classification}</p>
      <p>Language - {specie.language}</p>
      <p>Average Height - {specie.average_height} cm</p>
    </div>
  );
};

export default Specie;
