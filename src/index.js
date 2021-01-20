import React, { useState } from 'react';
import ReactDOM from 'react-dom';

import { BrowserRouter as Router } from 'react-router-dom';

import CharacterList from './CharacterList';

//import dummyData from './dummy-data';

import './styles.scss';

import endpoint from './endpoint';

const initialState = {
  result: null,
  loading: true,
  error: null,
};

// Making these constants to avoid typing errors
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

/*   const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); */

  React.useEffect(() => {
    dispatch({ type: LOADING });


/*     //in case there's a refresh button
    setLoading(true);
    setResponse(null);
    setError(null); */

    const fetchUrl = async () => {
      try {
        const response = await fetch(url);
        const data = await response.json();
        //setResponse(data);
        dispatch({ type: RESPONSE_COMPLETE, payload: { response: data } });
      } catch (error){
        dispatch({ type: ERROR, payload: { error } });
      }/*  finally {
        setLoading(false);
      } */
    };

    fetchUrl();

/*     fetch(url)
      .then(response => response.json())
      .then(response => {
        setLoading(false);
        setResponse(response);
      })
      .catch(error =>  {
        setLoading(false);
        setError(error);
      }); */

  }, []);

  return [state.result, state.loading, state.error];
}

const Application = () => {
  const [response, loading, error] = useFetch(endpoint + '/people/');
  const characters = (response && response.results) || [];
//   const [characters, setCharacters] = useState(dummyData);
/*   const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  React.useEffect(() => {
    //in case there's a refresh button
    setLoading(true);
    setCharacters([]);
    setError(null);

    fetch(endpoint + '/people/')
      .then(response => response.json())
      .then(response => {
        setLoading(false);
        setCharacters(response.results);
      })
      .catch(error =>  {
        setLoading(false);
        setError(error);
      });
    }, []); */
  return (
    <div className="Application">
      <header>
        <h1>Star Wars Characters</h1>
      </header>
      <main>
        <section className="sidebar">
          {
            loading ? <p>Loading...</p>
            : <CharacterList characters={characters} />
          }
          {error && <p className="error">Opps something went wrong... {error.message}</p>}
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
