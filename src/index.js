import React, { useReducer, useState } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import isFunction from 'lodash/isFunction';
import StarfieldAnimation from 'react-starfield-animation';

import CharacterList from './CharacterList';
import endpoint from './endpoint';

import './styles.scss';

const initialState = {
  result: null,
  loading: true,
  error: null,
};

const LOADING = 'LOADING';
const RESPONSE_COMPLETE = 'RESPONSE_COMPLETE';
const ERROR = 'ERROR';

const fetchReducer = (state, action) => {
  if (action.type === LOADING) {
    return {
      result: null,
      loading: true,
      error: null,
    }
  }

  if (action.type === RESPONSE_COMPLETE) {
    return {
      result: action.payload.response,
      loading: false,
      error: null,
    }
  }

  if (action.type === ERROR) {
    return {
      result: null,
      loading: false,
      error: action.payload.error,
    }
  }
  return state;
};

const useFetch = url => {
  const [state, dispatch] = React.useReducer(fetchReducer, initialState);

  React.useEffect(() => {
    dispatch({ type: LOADING });

    const fetchUrl = async () => {
      try {
        const response = await fetch(url);
        const data = await response.json();
        dispatch({ type: RESPONSE_COMPLETE, payload: { response: data } });
      } catch (error){
        dispatch({ type: ERROR, payload: { error } });
      }
    };

    fetchUrl();
  }, []);

  return [state.result, state.loading, state.error];
}

const useThunkReducer = (reducer, initialState) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const thunkDispatch = action => {
    console.log(action);

    if (isFunction(action)) {
      action(dispatch);
    } else {
      dispatch(action);
    }
  };

  return [state, dispatch];
}

const Application = () => {
  const [response, loading, error] = useFetch(endpoint + '/people/');
  const characters = (response && response.results) || [];

  return (
  <>
  
  <StarfieldAnimation
    className="stars"
    style={{
      position: 'absolute',
      width: '100%',
      height: '100%',
    }}/>
    <div className="Application">
      <header>
        <h1 className="header">Star Wars Characters</h1>
      </header>
      <main>
        <section className="sidebar">
          {
            loading ? <h1 className="loading"><span role="img" aria-label="galaxy emoji">🌌</span> Loading...</h1>
            : <CharacterList characters={characters} />
          }
          {error && <div className="error"><h2>Opps! something went wrong...</h2><p>{error.name}</p></div>}
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
