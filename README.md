# Star Wars Autocomplete

## Course

This project was built to teach the [State Managment in Redux & MobX Course](https://frontendmasters.com/courses/redux-mobx/) for Frontend Masters.

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
  fetch(`${endpoint}api/characters`)
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

```js
useEffect(() => {
  console.log('Fetching');
  fetch(`${endpoint}/search/${query}`)
    .then(response => response.json())
    .then(response => {
      console.log({ response });
      setCharacters(Object.values(response.characters));
    })
    .catch(console.error);
}, [query]);
```

## Adding Loading and Error States

We'll need to keep track of that state.

```js
const [loading, setLoading] = useState(true);
const [error, setError] = useState(error);
```

Updating the fetch effect.

```js
fetch(`${endpoint}/search/${query}`)
    .then(response => response.json())
    .then(response => {
      setCharacters(Object.values(response.characters));
      setLoading(false);
    })
    .catch(error => {
      setError(error);
      setLoading(false);
      setCharacters([]);
    });
}, [query]);
```

### Displaying It In The Component

```js
return (
  <div className="Application">
    <h1>Star Wars Characters</h1>
    <SearchCharacters query={query} onChange={handleQueryChange} />
    {loading ? (
      <p className="loading">Loading…</p>
    ) : (
      <Characters characters={characters} />
    )}
    {error && <p className="error">{error.message}</p>}
  </div>
);
```

## Creating a Custom Hook

```js
const useFetch = (url, dependencies = [], formatResponse = () => {}) => {
  const [result, setResult] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();

  useEffect(() => {
    fetch(url)
      .then(response => response.json())
      .then(response => {
        setResult(formatResponse(response));
        setLoading(false);
      })
      .catch(error => {
        setError(error);
        setLoading(false);
        setResult([]);
      });
  }, dependencies);

  return [result, loading, error];
};
```

Then, in the component.

```js
const [characters, loading, error] = useFetch(
  `${endpoint}/search/${query}`,
  [query],
  response => Object.values(response.characters),
);
```

## Refactoring to a Reducer

Writing a reducer

**TODO**: Refactor this out into an exercise with tests and let the students implement it.

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
  }, dependencies);

  const { result, loading, error } = state;

  return [result, loading, error];
};
```