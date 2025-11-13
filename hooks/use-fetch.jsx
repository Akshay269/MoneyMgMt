import { useState, useCallback, useMemo } from "react";
import { toast } from "sonner";

const useFetch = (cb) => {
  const [data, setData] = useState(undefined);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fn = useCallback(
    async (...args) => {
      setLoading(true);
      setError(null);

      try {
        const response = await cb(...args);
        setData(response);
        return response;
      } catch (err) {
        setError(err);
        toast.error(err?.message || "Failed");
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [cb]
  );

  // 🔒 memoize return object so React does not see it as new on each render
  const memoized = useMemo(
    () => ({ data, loading, error, fn, setData }),
    [data, loading, error, fn]
  );

  return memoized;
};

export default useFetch;
