import React, { useReducer, useEffect } from 'react';
import ReactDOM from 'react-dom';
import isFunction from 'lodash/isFunction';

import { BrowserRouter as Router } from 'react-router-dom';

import CharacterList from './CharacterList';

import dummyData from './dummy-data';

import './styles.scss';

const reducer = (state, action) => {
  if (action.type === 'LOADING') {
    return {
      characters: [],
      loading: true,
      error: null,
    };
  }

  if (action.type === 'RESPONSE_COMPLETE') {
    return {
      characters: action.payload.characters,
      loading: false,
      error: null,
    };
  }

  if (action.type === 'ERROR') {
    return {
      characters: [],
      loading: false,
      error: action.payload.error,
    };
  }

  return state;
};

const fetchCharacters = dispatch => {
  dispatch({ type: 'LOADING' });
  fetch(endpoint + '/characters')
    .then(response => response.json())
    .then(response =>
      dispatch({
        type: 'RESPONSE_COMPLETE',
        payload: { characters: response.characters },
      }),
    )
    .catch(error => dispatch({ type: 'ERROR', payload: { error } }));
};

const initialState = {
  error: null,
  loading: false,
  characters: [],
};

const useThunkReducer = (reducer, initialState) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const enhancedDispatch = React.useCallback(
    action => {
      console.log(action);

      if (isFunction(action)) {
        action(dispatch);
      } else {
        dispatch(action);
      }
    },
    [dispatch],
  );

  return [state, enhancedDispatch];
};

const Application = () => {
  const [state, dispatch] = useThunkReducer(reducer, initialState);
  const { characters } = state;

  useEffect(() => {
    dispatch(dispatch => {});
  }, [dispatch]);

  return (
    <div className="Application">
      <header>
        <h1>Star Wars Characters</h1>
      </header>
      <main>
        <section className="sidebar">
          <button onClick={() => dispatch(fetchCharacters)}>
            Fetch Characters
          </button>
          <CharacterList characters={characters} />
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
