// Icons
import { Calendar } from "lucide-react";

// Components
import Card from "@/shared/components/ui/Card";

/**
 * Vaqtni minutlarga aylantirish.
 * @param {string} time - "HH:mm" formatidagi vaqt
 * @returns {number|null}
 */
const toMinutes = (time) => {
  if (!time) return null;
  const [hours, minutes] = time.split(":").map(Number);
  if (Number.isNaN(hours) || Number.isNaN(minutes)) return null;
  return hours * 60 + minutes;
};

/**
 * Bitta sinf dars jadvali kartochkasi.
 * @param {Object} props
 * @param {Object} props.schedule - Sinf jadvali ma'lumoti
 * @returns {import("react").ReactElement}
 */
const ScheduleItem = ({ schedule }) => {
  const today = new Date();
  const currentMinutes = today.getHours() * 60 + today.getMinutes();

  return (
    <Card
      className="space-y-3"
      title={schedule.class?.name}
      icon={<Calendar strokeWidth={1.5} className="size-5 text-blue-500" />}
    >
      {schedule.subjects?.map((subj, index) => {
        const displayOrder =
          (schedule.startingOrder || 1) + (subj.order || index + 1) - 1;

        const endMinutes = toMinutes(subj.endTime);
        const startMinutes = toMinutes(subj.startTime);

        const isActive =
          startMinutes !== null &&
          endMinutes !== null &&
          currentMinutes >= startMinutes &&
          currentMinutes <= endMinutes;

        return (
          <div
            key={index}
            className={`p-3 rounded-lg ${
              isActive ? "bg-blue-50" : "bg-gray-50"
            }`}
          >
            <div className="flex items-start justify-between mb-1">
              {/* Fan nomi */}
              <b className="text-sm font-medium text-gray-900">
                {displayOrder}. {subj.subject?.name}
              </b>

              {/* O'qituvchi */}
              <div className="flex items-center gap-2">
                {isActive && (
                  <span className="text-[10px] font-semibold text-blue-700 bg-blue-100 px-2 py-0.5 rounded-full">
                    Aktiv
                  </span>
                )}
                <p className="text-xs text-gray-600">
                  {subj.teacher?.fullName ||
                    `${subj.teacher?.firstName || ""} ${subj.teacher?.lastName?.slice(0, 1) || ""}`.trim() + "."}
                </p>
              </div>
            </div>

            {/* Vaqt */}
            {subj.startTime && subj.endTime && (
              <p className="text-xs text-gray-500">
                {subj.startTime} - {subj.endTime}
              </p>
            )}
          </div>
        );
      })}
    </Card>
  );
};

export default ScheduleItem;
