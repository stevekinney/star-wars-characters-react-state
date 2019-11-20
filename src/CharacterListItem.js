import React from 'react';

import { NavLink } from 'react-router-dom';

const CharacterListItem = ({ character }) => {
  const { id, name } = character;
  return (
    <article className="CharacterListItem">
      <NavLink className="CharacterListItemLink" to={`/characters/${id}`}>
        {name}
      </NavLink>
    </article>
  );
};

export default CharacterListItem;
