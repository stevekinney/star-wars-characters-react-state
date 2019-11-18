import React, { useState, useEffect } from 'react';

import Character from './Character';
import endpoint from './endpoint';

const Characters = () => {
  const [characters, setCharacters] = useState([]);

  useEffect(() => {
    fetch(endpoint + '/characters')
      .then(response => response.json())
      .then(response => setCharacters(Object.values(response.characters)))
      .catch(console.error);
  }, []);

  return (
    <section className="Characters">
      {characters.map(character => (
        <Character key={character.id} character={character} />
      ))}
    </section>
  );
};

export default Characters;
