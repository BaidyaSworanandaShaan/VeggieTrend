import { useQuery } from "@tanstack/react-query";
import { getItemDetail } from "../services/priceServices";
import { useEffect } from "react";
import { getMsUntilNext7AM } from "../utils/timeUtils";

export const useItemDetails = (item) => {
  const msUntil7AM = getMsUntilNext7AM();

  const query = useQuery({
    queryKey: ["itemDetails", item],
    queryFn: () => getItemDetail(item),
    staleTime: msUntil7AM, // fresh until next 7 AM
    cacheTime: 1000 * 60 * 60 * 24,
    refetchOnWindowFocus: false,
    select: (data) => data.history,
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      query.refetch();
    }, msUntil7AM);

    return () => clearTimeout(timer);
  }, [msUntil7AM, query]);

  return query;
};
