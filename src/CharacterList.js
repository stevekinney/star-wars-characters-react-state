import React from 'react';

import CharacterListItem from './CharacterListItem';

const CharacterList = ({ characters = [] }) => {
  return (
    <section className="CharacterList">
      {
        characters.map(character => {
          character.id = characters.indexOf(character);
          return <CharacterListItem key={characters.indexOf(character)} character={character} />
        })
      }
    </section>
  );
};

export default CharacterList;
