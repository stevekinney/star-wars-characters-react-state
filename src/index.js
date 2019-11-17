import React, { useState } from 'react';
import ReactDOM from 'react-dom';

import SearchCharacters from './SearchCharacters';
import Characters from './Characters';

import './styles.scss';

const Application = () => {
  const [query, setQuery] = useState('');
  const [characters, setCharacters] = useState([]);

  const handleQueryChange = newQuery => {
    setQuery(newQuery);
  };

  return (
    <div className="Application">
      <h1>Star Wars Characters</h1>
      <SearchCharacters query={query} onChange={handleQueryChange} />
      <Characters characters={characters} />
    </div>
  );
};

const rootElement = document.getElementById('root');

ReactDOM.render(<Application />, rootElement);
