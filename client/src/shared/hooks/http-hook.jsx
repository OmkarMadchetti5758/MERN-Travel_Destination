import { useState, useCallback, useRef, useEffect } from "react";

export function useHttpClient() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const activeHttpRequests = useRef([]);
  const sendRequest = useCallback(
    async (url, method = "GET", body = null, headers = {}) => {
      setIsLoading(false);
      const httpAbortCtrl = new AbortController();
      activeHttpRequests.current.push(httpAbortCtrl);
      try {
        const response = await fetch(url, {
          method,
          body,
          headers,
          signal: httpAbortCtrl.signal,
        });
        setIsLoading(true)
        const responseData = await response.json();

        activeHttpRequests.current = activeHttpRequests.current.filter(reqCtrl => reqCtrl !== httpAbortCtrl);

        if (!response.ok) {
          throw new Error(responseData.message);
        }
        setIsLoading(false)
        return responseData;
      } catch (err) {
        setError(err.message);
        setIsLoading(false);
        throw err;
      }
    },
    []
  );
  function clearError(){
    setError(null);
  }

  useEffect(() => {
    return () => {
        activeHttpRequests.current.forEach(abortCtrl => abortCtrl.abort())
    }
  }, [])

  return {isLoading, error, sendRequest, clearError}
}