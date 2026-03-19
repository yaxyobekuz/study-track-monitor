// TanStack Query
import { useQuery } from "@tanstack/react-query";

// Icons
import { Coins } from "lucide-react";

// Components
import Card from "@/shared/components/ui/Card";
import Counter from "@/shared/components/ui/Counter";
import LoaderCard from "@/shared/components/ui/LoaderCard";

// API
import { coinsAPI } from "@/features/students/api/coins.api";

const CoinBalance = ({ studentId }) => {
  const { data, isLoading } = useQuery({
    queryKey: ["monitor", "coins", "balance", studentId],
    queryFn: () => coinsAPI.getBalance(studentId).then((res) => res.data?.data),
    enabled: !!studentId,
    refetchInterval: 5 * 60 * 1000,
  });

  if (isLoading) return <LoaderCard className="h-24" />;
  if (!data) return null;

  return (
    <Card
      title="Hozirgi tanga balansi"
      className="flex items-center justify-between"
      icon={<Coins className="text-yellow-500" size={28} />}
    >
      <div className="flex items-center gap-3">
        <Counter
          value={data.coinBalance ?? 0}
          className="text-3xl font-bold text-yellow-500"
        />
        <span className="text-gray-500 text-sm font-semibold">tanga</span>
      </div>
    </Card>
  );
};

export default CoinBalance;
