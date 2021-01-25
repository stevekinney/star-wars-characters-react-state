import React, { useEffect, useState } from 'react';
import endpoint from './endpoint';

const CharacterView = ({ match }) => {
  const [character, setCharacter] = useState({});

  useEffect(() => {
    fetch(endpoint + '/people/' + match.params.id)
      .then(response => response.json())
      .then(response => setCharacter(response))
      .then(console.log('Caracter?', character));
  }, [match.params.id]);
  return (
    <>
      <h2>{character.name}</h2>
      <ul className="CharacterDetails">
        <li>
          <strong>Birth Year</strong>: {character.birth_year}
        </li>
        <li>
          <strong>Eye Color</strong>: {character.eye_color}
        </li>
        <li>
          <strong>Gender</strong>: {character.gender}
        </li>
        <li>
          <strong>Hair Color</strong>: {character.hair_color}
        </li>
        <li>
          <strong>Heigh</strong>: {character.height}
        </li>
        <li>
          <strong>Mass</strong>: {character.mass}
        </li>
        <li>
          <strong>Skin Color</strong>: {character.skin_color}
        </li>
      </ul>
    </>
  );
};

export default CharacterView;
