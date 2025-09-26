import { useQuery } from "@tanstack/react-query";
import { getVolatileItems } from "../services/priceServices";
import { useEffect } from "react";
import { getMsUntilNext7AM } from "../utils/timeUtils";

export const useVolatilePrice = () => {
  const msUntil7AM = getMsUntilNext7AM();

  const query = useQuery({
    queryKey: ["volatilePrices"],
    queryFn: getVolatileItems,
    staleTime: msUntil7AM,
    cacheTime: 1000 * 60 * 60 * 24,
    refetchOnWindowFocus: false,
    select: (data) => data.topVolatiles,
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      query.refetch();
    }, msUntil7AM);

    return () => clearTimeout(timer);
  }, [msUntil7AM, query]);

  return query;
};
