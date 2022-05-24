import { useState, useEffect } from 'react';

const useFetch = (url, formatData) => {
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log('I am fetching...');

    setLoading(true);
    setError(null);
    setResponse(null);

    fetch(url)
      .then((response) => response.json())
      .then((response) => {
        console.log({ response });
        setResponse(formatData(response));
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, []);

  return [response, loading, error];
};

export default useFetch;
