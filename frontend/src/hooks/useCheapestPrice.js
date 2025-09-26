import { useQuery } from "@tanstack/react-query";
import { getCheapestItems } from "../services/priceServices";
import { useEffect } from "react";
import { getMsUntilNext7AM } from "../utils/timeUtils";

export const useCheapestPrice = () => {
  const msUntil7AM = getMsUntilNext7AM();

  const query = useQuery({
    queryKey: ["cheapestPrices"],
    queryFn: getCheapestItems,
    staleTime: msUntil7AM, // consider fresh until next 7 AM
    cacheTime: 1000 * 60 * 60 * 24, // keep cache 24h in memory even if unused
    refetchOnWindowFocus: false, // optional, avoids refetch on focus
    select: (data) => data.topCheapest, // return only topCheapest
  });

  // Auto-refetch at 7 AM even if user is on page
  useEffect(() => {
    const timer = setTimeout(() => {
      query.refetch();
    }, msUntil7AM);

    return () => clearTimeout(timer);
  }, [msUntil7AM, query]);

  return query; // { data, isLoading, isError, error }
};
