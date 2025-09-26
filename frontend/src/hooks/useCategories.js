import { useQuery } from "@tanstack/react-query";

import { useEffect } from "react";
import { getMsUntilNext7AM } from "../utils/timeUtils";

import {
  getCategories,
  getItemsByCategories,
} from "../services/categoriesServices";

export const useCategories = () => {
  const msUntil7AM = getMsUntilNext7AM();
  const query = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
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
export const useItemByCategories = (categoryId) => {
  const msUntil7AM = getMsUntilNext7AM();
  const query = useQuery({
    queryKey: ["itemByCategories"],

    queryFn: () => getItemsByCategories(categoryId),
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
