import { useState, useEffect } from "react";

const UseFetch = (url, token = null) => {
  const [data, setData] = useState(null);
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const abortCont = new AbortController();

    const requestOptions = {
      signal: abortCont.signal,
      headers: {},
    };

    if (token) {
      requestOptions.headers["Authorization"] = `Bearer ${token}`;
    }

    fetch(url, requestOptions)
      .then((res) => {
        if (!res.ok) {
          throw Error(`Could not fetch data from ${url}`);
        }
        return res.json();
      })
      .then((data) => {
        setData(data);
        setIsPending(false);
        setError(null);
        console.log(url);
      })
      .catch((err) => {
        if (err.name === "AbortError") {
          console.log(err.message);
        } else {
          setIsPending(false);
          setError(err.message);
        }
      });

    return () => abortCont.abort();
  }, [data, token, url]);

  return [data, isPending, error];
};

export default UseFetch;
