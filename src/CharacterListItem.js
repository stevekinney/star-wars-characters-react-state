import React from 'react';

import { NavLink } from 'react-router-dom';


const addCharView = () => {
  const characterView = document.querySelector(".CharacterView");
  return characterView.classList.add("visible");
}

const CharacterListItem = ({ character }) => {
  const { id, name } = character;
  return (
    <article className="CharacterListItem" onClick={() => {if (!document.querySelector(".CharacterView.visible")) { addCharView() }}}>
      <NavLink className="CharacterListItemLink" to={`/characters/${id}`}>
        {name}
      </NavLink>
    </article>
  );
};

export default CharacterListItem;
