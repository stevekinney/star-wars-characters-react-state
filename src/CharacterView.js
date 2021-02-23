import React from 'react';

const CharacterView = ({ character = {} }) => {
  console.log(character);
  return (
    <section className="CharacterView">
      <h2>{character.name}</h2>
      <ul className="CharacterDetails">
        <li>
          <strong>Birth Year</strong>: {character.birth_year}
        </li>
        <li>
          <strong>Eye Color</strong>: {character.eye_yolor}
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
    </section>
  );
};

export default CharacterView;
