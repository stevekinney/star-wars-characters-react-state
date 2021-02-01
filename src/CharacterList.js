import React from 'react';

import CharacterListItem from './CharacterListItem';

const CharacterList = ({ characters = [] }) => {
  return (
    <section className="CharacterList">
      {
        characters.map(character => {
          if (!character.id) {
            character.id = characters.indexOf(character)+1;
          }
          return <CharacterListItem key={character.id} character={character} />
        })
      }
    </section>
  );
};

export default CharacterList;
