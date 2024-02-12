import { useState } from 'react';

function useAsync(asyncFunction) {
  const [pending, setPending] = useState(false);
  const [error, setError] = useState(null);

  const wrappedFunction = async (...args) => {
    setError(null);
    setPending(true);
    try {
      const result = await asyncFunction(...args);
      return result;
    } catch (e) {
      setError(e);
      return;
    } finally {
      setPending(false);
    }
  };

  return [pending, error, wrappedFunction];
}
export default useAsync;
