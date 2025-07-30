import { getUser } from "@features/auth";
import { useQuery } from "@tanstack/react-query";
import { UseLocalStorage, PREFIX } from "@utils/storage";

const QUERY_KEY = ['users/me'];

export const useUser = () => {
  const { getItem } = UseLocalStorage();
  const token = getItem(`${PREFIX}token`);

  return useQuery({
    queryKey: QUERY_KEY,
    queryFn: getUser,
    staleTime: 0,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    retry: (failureCount, error: unknown) => {
      // Don't retry on 500 errors (server errors)
      const axiosError = error as { response?: { status?: number } };
      if (axiosError?.response?.status && axiosError.response.status >= 500) {
        console.error('Server error on /users/me, not retrying:', axiosError.response.status);
        return false;
      }
      // Only retry once for other errors
      return failureCount < 1;
    },
    retryDelay: 1000,
    enabled: !!token, // Only fetch if we have a token
  });
};