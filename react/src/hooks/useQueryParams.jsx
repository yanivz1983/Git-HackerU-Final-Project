import { useMemo } from "react";
import { useLocation } from "react-router-dom";

const useQueryParams = () => {
  const { search } = useLocation();

  return useMemo(() => {
    const queryParams = {};
    const urlSearchParams = new URLSearchParams(search);

    for (let [key, value] of urlSearchParams) {
      queryParams[key] = value;
    }

    return queryParams;
  }, [search]);
};

export default useQueryParams;
