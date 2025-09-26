import { useQuery } from "@tanstack/react-query";
import { getExpensiveItems } from "../services/priceServices";
import { useEffect } from "react";
import { getMsUntilNext7AM } from "../utils/timeUtils";

export const useExpensivePrices = () => {
  const msUntil7AM = getMsUntilNext7AM();

  const query = useQuery({
    queryKey: ["expensivePrices"],
    queryFn: getExpensiveItems,
    staleTime: msUntil7AM,
    cacheTime: 1000 * 60 * 60 * 24,
    refetchOnWindowFocus: false,
    select: (data) => data.topExpensive,
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      query.refetch();
    }, msUntil7AM);

    return () => clearTimeout(timer);
  }, [msUntil7AM, query]);

  return query;
};
