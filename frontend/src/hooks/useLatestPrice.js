import { useQuery } from "@tanstack/react-query";
import { getLatestPrices } from "../services/priceServices";
import { useEffect } from "react";
import { getMsUntilNext7AM } from "../utils/timeUtils";

export const useLatestPrice = () => {
  const msUntil7AM = getMsUntilNext7AM();
  const query = useQuery({
    queryKey: ["latestPrices"],
    queryFn: getLatestPrices,
    staleTime: 1000 * 60 * 60 * 24, // ✅ fresh for 24h
    cacheTime: 1000 * 60 * 60 * 24, // keep cache for 24h
    select: (data) => ({
      prices: data.prices,
      date: data.date,
    }),
  });
  useEffect(() => {
    const timer = setTimeout(() => {
      query.refetch();
    }, getMsUntilNext7AM);

    return () => clearTimeout(timer);
  }, [msUntil7AM, query]);
  return query;
};
