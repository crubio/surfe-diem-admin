import { getUser } from "@features/auth";
import { useQuery } from "@tanstack/react-query";

const QUERY_KEY = 'api/v1/users/me';

export const useUser = () => {
  return useQuery([QUERY_KEY], getUser, { staleTime: 0, refetchOnWindowFocus: false, refetchOnMount: false}); 
};