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
    <Characters characters={characters} />
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

---

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
