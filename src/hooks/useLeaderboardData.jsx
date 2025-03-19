import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getLeadered, createLeadered } from "../services/apiLeaderedTable";

export function useLeaderboardData() {
  const queryClient = useQueryClient();

  // Veriyi çek
  const { data, isLoading, error } = useQuery({
    queryKey: ["leaderedTable"],
    queryFn: getLeadered,
  });

  // Veri gönderme fonksiyonu
  const { mutate } = useMutation({
    mutationFn: createLeadered,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["leaderedTable"] });
    },
    onError: (err) => console.log(err.message),
  });

  return { data, isLoading, error, mutate };
}
