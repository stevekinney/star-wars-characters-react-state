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

## A Refactoring for a Different Kind of API