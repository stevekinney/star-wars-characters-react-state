import React, { useEffect, useState } from 'react';
import dummyData from './dummy-data';
import endpoint from './endpoint';

const CharacterView = ({ match }) => {
  const [character, setCharacter] = useState({});
  const [ dummyCharacters, setDummyCharacters ] = useState(dummyData);

  useEffect(() => {
    fetch(endpoint + '/pe3243242ople/' + match.params.id)
      .then(response => response.json())
      .then(response => setCharacter(response));
  }, [match.params.id]);
  return (
    <>
      <h2>{ character.name ? character.name : dummyCharacters[match.params.id].name }</h2>
      <ul className="CharacterDetails">
        <li>
          <strong>Birth Year</strong>: { character.id ? character.birth_year : dummyCharacters[match.params.id].birthYear }
        </li>
        <li>
          <strong>Eye Color</strong>: { character.id ? character.eye_color : dummyCharacters[match.params.id].eyeColor }
        </li>
        <li>
          <strong>Gender</strong>: { character.id ? character.gender : dummyCharacters[match.params.id].gender }
        </li>
        <li>
          <strong>Hair Color</strong>: { character.id ? character.hair_color : dummyCharacters[match.params.id].hairColor }
        </li>
        <li>
          <strong>Heigh</strong>: { character.id ? character.height : dummyCharacters[match.params.id].height }
        </li>
        <li>
          <strong>Mass</strong>: { character.id ? character.mass : dummyCharacters[match.params.id].mass }
        </li>
        <li>
          <strong>Skin Color</strong>: { character.id ? character.skin_color : dummyCharacters[match.params.id].skinColor }
        </li>
      </ul>
    </>
  );
};

export default CharacterView;
