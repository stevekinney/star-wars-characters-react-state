import React, { useEffect, useState } from 'react';
/* import dummyData from './dummy-data'; */
import endpoint from '../Utilities/endpoint';

const CharacterView = ({ match }) => {
  const [character, setCharacter] = useState({});
  // eslint-disable-next-line
  /* const [ dummyCharacters, setDummyCharacters ] = useState(dummyData); */

  useEffect(() => {
    // this fixes the mismatch between the param id and the actual character to display
    let newId = Number(match.params.id) + 1;
    fetch(endpoint + 'people/' + newId)
      .then(response => response.json())
      .then(response => setCharacter(response));
  }, [match.params.id]);

  /* console.log('test....', dummyCharacters); */
  return (
    <>
      <h2>{ character.name /* ? character.name : dummyCharacters[match.params.id].name */ }</h2>
      <section>
      <ul className="CharacterDetails"> {/* {console.log('TEST char', character)} */}
        <li>
          <strong>Birth Year</strong>: { character.birth_year /* character.id ? character.birth_year : dummyCharacters[match.params.id].birthYear */ }
        </li>
        <li>
          <strong>Eye Color</strong>: { character.eye_color /* character.id ? character.eye_color : dummyCharacters[match.params.id].eyeColor */ }
        </li>
        <li>
          <strong>Gender</strong>: { character.gender /* character.id ? character.gender : dummyCharacters[match.params.id].gender */ }
        </li>
        <li>
          <strong>Hair Color</strong>: { character.hair_color /* character.id ? character.hair_color : dummyCharacters[match.params.id].hairColor */ }
        </li>
        <li>
          <strong>Heigh</strong>: { character.height /* character.id ? character.height : (dummyCharacters[match.params.id].height)/100 */ } m
        </li>
        <li>
          <strong>Mass</strong>: { character.mass /* character.id ? character.mass : dummyCharacters[match.params.id].mass */ } kg
        </li>
        <li>
          <strong>Skin Color</strong>: { character.skin_color /* character.id ? character.skin_color : dummyCharacters[match.params.id].skinColor */ }
        </li>
      </ul>
        {/* <img src={require(dummyCharacters[match.params.id].src)} alt={dummyCharacters[match.params.id].alt} /> */}
      </section>
    </>
  );
};

export default CharacterView;
