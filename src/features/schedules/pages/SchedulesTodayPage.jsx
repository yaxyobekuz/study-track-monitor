// TanStack Query
import { useQuery } from "@tanstack/react-query";

// Router
import { Link } from "react-router-dom";

// Icons
import { BookOpen } from "lucide-react";

// API
import { schedulesAPI } from "@/features/schedules/api/schedules.api";

// Components
import Card from "@/shared/components/ui/Card";
import Button from "@/shared/components/ui/button/Button";
import LoaderCard from "@/shared/components/ui/LoaderCard";
import ScheduleItem from "@/features/schedules/components/ScheduleItem";

const SchedulesTodayPage = () => {
  const { data: schedules, isLoading } = useQuery({
    queryKey: ["monitor", "schedules", "all-today"],
    queryFn: () => schedulesAPI.getAllToday().then((res) => res.data.data),
    refetchInterval: 5 * 60 * 1000,
  });

  if (isLoading) return <LoaderCard className="h-96" />;

  return (
    <div className="pb-20">
      {/* Sarlavha */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold">
          Bugungi barcha sinf dars jadvallari
        </h2>

        <Button asChild variant="link">
          <Link to="/schedules">Barcha dars jadvali</Link>
        </Button>
      </div>

      {/* Bo'sh holat */}
      {(!schedules || schedules.length === 0) && (
        <Card>
          <div className="text-center py-8">
            <BookOpen
              className="size-12 text-gray-300 mx-auto mb-3"
              strokeWidth={1.5}
            />
            <p className="text-gray-500">Bugun darslar yo'q</p>
          </div>
        </Card>
      )}

      {/* Jadval grid */}
      {schedules && schedules.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {schedules.map((schedule, idx) => (
            <ScheduleItem key={idx} schedule={schedule} />
          ))}
        </div>
      )}
    </div>
  );
};

export default SchedulesTodayPage;
