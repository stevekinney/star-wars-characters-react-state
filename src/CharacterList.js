import React from 'react';

import CharacterListItem from './CharacterListItem';

const CharacterList = ({ characters = [] }) => {
  return (
    <section className="CharacterList">
      {
        characters.map(character => {
          character.id = characters.indexOf(character)+1;
          console.log('INNER Characters in list:', character)
          return <CharacterListItem key={character.id} character={character} />
        })
      }
    </section>
  );
};

export default CharacterList;
