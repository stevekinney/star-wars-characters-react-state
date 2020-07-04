# Star Wars Autocomplete

## Course

This project was built to teach the [React State](#) for Frontend Masters.

## The Basics

If we wanted to fetch all of the characters, we could do something like this.

```js
useEffect(() => {
  console.log('Fetching');
  fetch(`${endpoint}/characters`)
    .then(response => response.json())
    .then(response => {
      console.log({ response });
      setCharacters(Object.values(response.characters));
    })
    .catch(console.error);
});
```

A careful eye will see that this is actually triggering an infinite loop since we're calling this effect on every single render.

Adding a bracket will make this less bad.

```js
useEffect(() => {
  console.log('Fetching');
  fetch(`${endpoint}/characters`)
    .then(response => response.json())
    .then(response => {
      console.log({ response });
      setCharacters(Object.values(response.characters));
    })
    .catch(console.error);
}, []);
```

This has its own catch since this will only run once when the component mounts and will never run again.

But we can burn that bridge later.

Okay, but we want this to run every time the search term changes.

## Adding Loading and Error States

We'll need to keep track of that state.

```js
const [loading, setLoading] = useState(true);
const [error, setError] = useState(error);
```

Updating the fetch effect.

```js
useEffect(() => {
  console.log('Fetching');

  setLoading(true);
  setError(null);
  setCharacters([]);

  fetch(`${endpoint}/characters`)
    .then(response => response.json())
    .then(response => {
      setCharacters(Object.values(response.characters));
      setLoading(false);
    })
    .catch(error => {
      setError(error);
      setLoading(false);
    });
}, []);
```

### Displaying It In The Component

```js
<section className="sidebar">
  {loading ? (
    <p className="loading">Loading…</p>
  ) : (
    <CharacterList characters={characters} />
  )}
  {error && <p className="error">{error.message}</p>}
</section>
```

## Creating a Custom Hook

```js
const useFetch = url => {
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log('Fetching');

    setLoading(true);
    setError(null);
    setResponse(null);

    fetch(url)
      .then(response => response.json())
      .then(response => {
        setResponse(response);
        setLoading(false);
      })
      .catch(error => {
        setError(error);
        setLoading(false);
      });
  }, [url]);

  return [response, loading, error];
};
```

### Adding the Formatting in There

Let's break that out into a function.

```js
const formatData = response => (response && response.characters) || [];
```

Then we can use it like this.

```js
const [characters, loading, error] = useFetch(
  endpoint + '/characters',
  formatData,
);
```

We can add that to our `useEffect`.

```js
useEffect(() => {
  console.log('Fetching');

  setLoading(true);
  setError(null);
  setResponse(null);

  fetch(url)
    .then(response => response.json())
    .then(response => {
      setResponse(formatData(response));
      setLoading(false);
    })
    .catch(error => {
      setError(error);
      setLoading(false);
    });
}, [url, formatData]);
```

## Using an Async Function

You can't pass an async function directly to `useEffect`.

```js
useEffect(() => {
    console.log('Fetching');

    setLoading(true);
    setError(null);
    setResponse(null);

    const get = async () => {
      try {
        const response = await fetch(url);
        const data = await response.json();
        setResponse(formatData(data));
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    get();
  }, [url, formatData]);

  return [response, loading, error];
};
```

I don't like this, but you might.

## Refactoring to a Reducer

```js
const fetchReducer = (state, action) => {
  if (action.type === 'FETCHING') {
    return {
      result: null,
      loading: true,
      error: null,
    };
  }

  if (action.type === 'RESPONSE_COMPLETE') {
    return {
      result: action.payload.result,
      loading: false,
      error: null,
    };
  }

  if (action.type === 'ERROR') {
    return {
      result: null,
      loading: false,
      error: action.payload.error,
    };
  }

  return state;
};
```

Now, we can just dispatch actions.

```js
const useFetch = (url, dependencies = [], formatResponse = () => {}) => {
  const [state, dispatch] = useReducer(fetchReducer, initialState);

  useEffect(() => {
    dispatch({ type: 'FETCHING' });
    fetch(url)
      .then(response => response.json())
      .then(response => {
        dispatch({
          type: 'RESPONSE_COMPLETE',
          payload: { result: formatResponse(response) },
        });
      })
      .catch(error => {
        dispatch({ type: 'ERROR', payload: { error } });
      });
  }, [url, formatResponse]);

  const { result, loading, error } = state;

  return [result, loading, error];
};
```

## Dispensing Asynchronous Actions

**Important**: We're going to check out the `asynchronous-actions` branch.

How could we right a simple thunk reducer?

```js
const useThunkReducer = (reducer, initialState) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const enhancedDispatch = useCallback(
    action => {
      if (typeof action === 'function') {
        console.log('It is a thunk');
        action(dispatch);
      } else {
        dispatch(action);
      }
    },
    [dispatch],
  );

  return [state, enhancedDispatch];
};
```

Now, we just use that reducer instead.

We can have a totally separate function for fetching the data that our state management doesn't know anything about.

```js
const fetchCharacters = dispatch => {
  dispatch({ type: 'FETCHING' });
  fetch(endpoint + '/characters')
    .then(response => response.json())
    .then(response => {
      dispatch({
        type: 'RESPONSE_COMPLETE',
        payload: {
          characters: response.characters,
        },
      });
    })
    .catch(error => dispatch({ type: error, payload: { error } }));
};
```

#### Exercise: Implementing Character Search

There is a `CharacterSearch` component. Can you you implement a feature where we update the list based on the search field?

```js
import React from 'react';
import endpoint from './endpoint';

const SearchCharacters = React.memo(({ dispatch }) => {
  const [query, setQuery] = React.useState('');

  React.useEffect(() => {
    dispatch({ type: 'FETCHING' });
    fetch(endpoint + '/search/' + query)
      .then(response => response.json())
      .then(response => {
        dispatch({
          type: 'RESPONSE_COMPLETE',
          payload: {
            characters: response.characters,
          },
        });
      })
      .catch(error => dispatch({ type: error, payload: { error } }));
  }, [query, dispatch]);

  return (
    <input
      onChange={event => setQuery(event.target.value)}
      placeholder="Search Here"
      type="search"
      value={query}
    />
  );
});

export default SearchCharacters;
```

## The Perils of `useEffect` and Dependencies

We're going to need to important more things.

```js
import { BrowserRouter as Router, Route } from 'react-router-dom';

import CharacterList from './CharacterList';
import CharacterView from './CharacterView';
```

Now, we'll add this little tidbit.

```js
<section className="CharacterView">
  <Route path="/characters/:id" component={CharacterView} />
</section>
```

In `CharacterView`, we'll do the following refactoring:

```js
const CharacterView = ({ match }) => {
  const [character, setCharacter] = useState({});

  useEffect(() => {
    fetch(endpoint + '/characters/' + match.params.id)
      .then(response => response.json())
      .then(response => setCharacter(response.character))
      .catch(console.error);
  }, []);

  // …
};
```

I have an ESLint plugin that solves most of this for us.

```js
const CharacterView = ({ match }) => {
  const [character, setCharacter] = useState({});

  useEffect(() => {
    fetch(endpoint + '/characters/' + match.params.id)
      .then(response => response.json())
      .then(response => setCharacter(response.character))
      .catch(console.error);
  }, []);

  // …
};
```
