import React from 'react';

import { NavLink } from 'react-router-dom';


const addCharView = () => {
  const characterView = document.querySelector(".CharacterView");
  console.log('TEST');
  return characterView.classList.add("visible");
}

const CharacterListItem = ({ character }) => {
  const { id, name } = character;
  return (
    <article className="CharacterListItem" onClick={() => addCharView()}>
      <NavLink className="CharacterListItemLink" to={`/characters/${id}`}>
        {name}
      </NavLink>
    </article>
  );
};

export default CharacterListItem;
