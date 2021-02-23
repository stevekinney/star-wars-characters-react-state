// export default 'https://star-wars-character-search.glitch.me/api';
// old api not available, check new api at swapi.dev, check the slight difference below
export default 'https://swapi.dev/api/people/';

/* 
NOTICE:

1. there is trailing slash at the end of all endpoints, add '/' when necessary
2. there is no id including in this api, while you can extract from the url, such as:
  characters.map((item) => (item.id = item.url.slice(-2, -1)));
  hint: you may want to add this line to your reducer
3. the property naming is in snake_case
4. endpoint response data structure:

{
  "count": 82,
  "next": "http://swapi.dev/api/people/?page=2",
  "previous": null,
  "results":[
    {"name": "Luke Skywalker", "height": "172", "mass": "77", "hair_color": "blond",…},
    {"name": "C-3PO", "height": "167", "mass": "75", "hair_color": "n/a",…},
    {"name": "R2-D2", "height": "96", "mass": "32", "hair_color": "n/a",…},
    {"name": "Darth Vader", "height": "202", "mass": "136", "hair_color": "none",…},
    {"name": "Leia Organa", "height": "150", "mass": "49", "hair_color": "brown",…},
    {"name": "Owen Lars", "height": "178", "mass": "120", "hair_color": "brown, grey",…},
    {"name": "Beru Whitesun lars", "height": "165", "mass": "75", "hair_color": "brown",…},
    {"name": "R5-D4", "height": "97", "mass": "32", "hair_color": "n/a",…},
    {"name": "Biggs Darklighter", "height": "183", "mass": "84", "hair_color": "black",…},
    {"name": "Obi-Wan Kenobi", "height": "182", "mass": "77", "hair_color": "auburn, white",…}
  ]
}

5. character data structure:
{
  "name": "Luke Skywalker",
  "height": "172",
  "mass": "77",
  "hair_color": "blond",
  "skin_color": "fair",
  "eye_color": "blue",
  "birth_year": "19BBY",
  "gender": "male",
  "homeworld": "http://swapi.dev/api/planets/1/",
  "films":["http://swapi.dev/api/films/1/", "http://swapi.dev/api/films/2/",…],
  "species":[],
  "vehicles":["http://swapi.dev/api/vehicles/14/", "http://swapi.dev/api/vehicles/30/"…],
  "starships":["http://swapi.dev/api/starships/12/", "http://swapi.dev/api/starships/22/"…],
  "created": "2014-12-09T13:50:51.644000Z",
  "edited": "2014-12-20T21:17:56.891000Z",
  "url": "http://swapi.dev/api/people/1/"
}
*/
