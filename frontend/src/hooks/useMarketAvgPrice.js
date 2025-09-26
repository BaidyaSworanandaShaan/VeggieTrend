import { useQuery } from "@tanstack/react-query";

import { useEffect } from "react";
import { getMsUntilNext7AM } from "../utils/timeUtils";
import { getMarketAvgPrice } from "../services/priceServices";

export const useMarketAvgPrice = () => {
  const msUntil7AM = getMsUntilNext7AM();
  const query = useQuery({
    queryKey: ["marketAvgPrice"],
    queryFn: getMarketAvgPrice,
    staleTime: 1000 * 60 * 60 * 24, // fresh for 24h
    cacheTime: 1000 * 60 * 60 * 24,
  });
  useEffect(() => {
    const timer = setTimeout(() => {
      query.refetch();
    }, getMsUntilNext7AM);

    return () => clearTimeout(timer);
  }, [msUntil7AM, query]);
  return query;
};
