import React from 'react';

import { Link } from 'react-router-dom';

const Character = ({ character }) => {
  const { id, name } = character;
  return (
    <article className="Character">
      <Link to={`/characters/${id}`}>{name}</Link>
    </article>
  );
};

export default Character;
