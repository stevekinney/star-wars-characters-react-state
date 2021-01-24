import React, { useReducer, useEffect } from 'react';
import ReactDOM from 'react-dom';

import { BrowserRouter as Router, Route } from 'react-router-dom';
import StarfieldAnimation from 'react-starfield-animation';

import CharacterList from './CharacterList';
import CharacterView from './CharacterView';

import endpoint from './endpoint';

import './styles.scss';

const reducer = (state, action) => {
  if (action.type === 'FETCHING') {
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

const fetchCharacters = (dispatch) => {
  dispatch({ type: 'LOADING' });
  fetch(endpoint + '/people')
    .then(response => response.json())
    .then(response => dispatch({ type: 'RESPONSE_COMPLETE', payload: {characters: response.results} 
      }), console.log('TESTING')
    )
    //.then(response => dispatch({ type: 'RESPONSE_COMPLETE', payload: {characters: response.results} }))
  .catch(error => dispatch({ type: 'ERROR', payload: { error }}));
}

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

      if (typeof(action) === 'function') {
        action(dispatch);
      } else {
        dispatch(action);
      }
  },
  [dispatch],
  );
  return [state, enhancedDispatch];
}

const Application = () => {
  const [state, dispatch] = useThunkReducer(reducer, initialState);
  const { characters } = state;

  useEffect(() => {
    dispatch(dispatch => {});
  }, [dispatch])

  return (
    <>
    <StarfieldAnimation className="stars"/>
      <div className="Application">
        <header>
          <h1 className="header">Star Wars Characters</h1>
        </header>
        <main>
          <section className="sidebar">
            <button className="button-fetch" onClick={() => dispatch(fetchCharacters)}>Fetch Characters</button>
            {
            state.loading ? <h1 className="loading"><span role="img" aria-label="galaxy emoji">🌌</span> Loading...</h1>
            :<CharacterList characters={characters} />
            }
            {state.error && <div className="error"><p>Opps! something went wrong... a "{state.error.name}" has occured</p></div>}
          </section>
          <section className="CharacterView">
            <Route path="/characters/:id" component={CharacterView}/>
          </section>
        </main>
      </div>
    </>
  );
};

const rootElement = document.getElementById('root');

ReactDOM.render(
  <Router>
    <Application />
  </Router>,
  rootElement,
);