// Data
import { days } from "@/shared/data/days.data";

// React
import { useState, useEffect } from "react";

// TanStack Query
import { useQuery } from "@tanstack/react-query";

// Router
import { Link } from "react-router-dom";

// Icons
import { ArrowLeft, Calendar } from "lucide-react";

// API
import { classesAPI } from "@/features/classes/api/classes.api";
import { schedulesAPI } from "@/features/schedules/api/schedules.api";

// Components
import Card from "@/shared/components/ui/Card";
import Select from "@/shared/components/ui/select/Select";
import LoaderCard from "@/shared/components/ui/LoaderCard";

/**
 * To'liq dars jadvali sahifasi.
 * Sinf tanlanib, hafta kunlari bo'yicha jadval ko'rsatiladi.
 *
 * @returns {import("react").ReactElement}
 */
const FullSchedulePage = () => {
  const [selectedClass, setSelectedClass] = useState("");

  // Sinflar ro'yxati
  const { data: classes = [], isLoading: classesLoading } = useQuery({
    queryKey: ["monitor", "classes"],
    queryFn: () => classesAPI.getAll().then((res) => res.data.data),
    refetchInterval: 5 * 60 * 1000,
  });

  // Birinchi sinfni avtomatik tanlash
  useEffect(() => {
    if (classes.length > 0 && !selectedClass) {
      setSelectedClass(classes[0]._id);
    }
  }, [classes, selectedClass]);

  // Tanlangan sinf jadvali
  const { data: schedules = [], isLoading: schedulesLoading } = useQuery({
    queryKey: ["monitor", "schedules", "class", selectedClass],
    queryFn: () =>
      schedulesAPI.getByClass(selectedClass).then((res) => res.data.data),
    enabled: !!selectedClass,
    refetchInterval: 5 * 60 * 1000,
  });

  const getScheduleForDay = (day) => {
    return schedules.find((s) => s.day === day);
  };

  if (classesLoading) return <LoaderCard className="h-96" />;

  return (
    <div className="pb-20">
      {/* Tepasi */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <Link
            to="/schedules-today"
            className="flex items-center justify-center size-10 rounded-lg hover:bg-gray-100"
          >
            <ArrowLeft strokeWidth={1.5} />
          </Link>
          <h1 className="text-xl font-semibold">Dars jadvali</h1>
        </div>

        <Select
          value={selectedClass}
          onChange={(v) => setSelectedClass(v)}
          options={classes.map((cls) => ({
            label: cls.name,
            value: cls._id,
          }))}
        />
      </div>

      {/* Jadval grid */}
      {schedulesLoading ? (
        <LoaderCard className="h-96" />
      ) : (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {days.map((day) => {
            const schedule = getScheduleForDay(day.value);

            return (
              <Card key={day.value}>
                <div className="flex items-center gap-3.5 mb-4">
                  <Calendar
                    strokeWidth={1.5}
                    className="size-5 text-blue-500"
                  />
                  <h3 className="text-lg font-semibold text-gray-900">
                    {day.label}
                  </h3>
                </div>

                {/* Darslar */}
                {schedule && (
                  <div className="space-y-3">
                    {schedule.subjects.map((subj, index) => {
                      const displayOrder =
                        (schedule.startingOrder || 1) +
                        (subj.order || index + 1) -
                        1;

                      return (
                        <div key={index} className="p-3 bg-gray-50 rounded-lg">
                          <div className="flex items-start justify-between mb-1">
                            <b className="text-sm font-medium text-gray-900">
                              {displayOrder}. {subj.subject?.name}
                            </b>
                            <p className="text-xs text-gray-600">
                              {subj.teacher?.firstName}{" "}
                              {subj.teacher?.lastName?.slice(0, 1) + "."}
                            </p>
                          </div>

                          {subj.startTime && subj.endTime && (
                            <p className="text-xs text-gray-500 mt-1">
                              {subj.startTime} - {subj.endTime}
                            </p>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}

                {/* Jadval yo'q */}
                {!schedule && (
                  <p className="text-sm text-gray-500 text-center py-4">
                    Jadval yo'q
                  </p>
                )}
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default FullSchedulePage;
