import React from 'react';
import ReactDOM from 'react-dom';

import { BrowserRouter as Router, Route } from 'react-router-dom';

import Characters from './Characters';

import './styles.scss';
import CharacterView from './CharacterView';

const Application = () => {
  return (
    <div className="Application">
      <h1>Star Wars Characters</h1>
      <main>
        <section className="sidebar">
          <Characters />
        </section>
        <section className="character-view">
          <Route path="/characters/:id" component={CharacterView} />
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
