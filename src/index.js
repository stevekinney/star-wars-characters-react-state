import React from 'react';
import ReactDOM from 'react-dom';

import { BrowserRouter as Router } from 'react-router-dom';

import CharacterList from './CharacterList';

import endpoint from './endpoint';
import useFetch from './useFetch';

import './styles.scss';

const formatData = (response) => (response && response.characters) || [];

const Application = () => {
  const [characters, loading, error] = useFetch(
    `${endpoint}/characters`,
    formatData,
  );

  return (
    <div className="Application">
      <header>
        <h1>Star Wars Characters</h1>
      </header>
      <main>
        <section className="sidebar">
          {loading ? (
            <p className="loading">Loading...</p>
          ) : (
            <CharacterList characters={characters} />
          )}

          {error && <p className="error">{error.message}</p>}
        </section>
      </main>
    </div>
  );
};

const rootElement = document.getElementById('root');

ReactDOM.render(
  <Router>
    <Application />
  </Router>,
  rootElement,
);
