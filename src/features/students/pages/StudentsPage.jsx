// React
import { useState, useEffect } from "react";

// TanStack Query
import { useQuery } from "@tanstack/react-query";

// Icons
import { UserSearch } from "lucide-react";

// API
import { classesAPI } from "@/features/classes/api/classes.api";

// Components
import Card from "@/shared/components/ui/Card";
import LoaderCard from "@/shared/components/ui/LoaderCard";
import InputGroup from "@/shared/components/ui/input/InputGroup";
import SelectField from "@/shared/components/ui/select/SelectField";
import WeeklyStats from "@/features/students/components/WeeklyStats";
import CoinBalance from "@/features/students/components/CoinBalance";
import SocialNetworks from "@/features/students/components/SocialNetworks";

const StudentsPage = () => {
  const [selectedClass, setSelectedClass] = useState("");
  const [selectedStudent, setSelectedStudent] = useState("");

  // Sinflar ro'yxati
  const { data: classes = [], isLoading: classesLoading } = useQuery({
    queryKey: ["monitor", "classes"],
    queryFn: () => classesAPI.getAll().then((res) => res.data.data),
    refetchInterval: 5 * 60 * 1000,
  });

  // O'quvchilar ro'yxati (sinfga qarab)
  const { data: students = [], isLoading: studentsLoading } = useQuery({
    queryKey: ["monitor", "classes", selectedClass, "students"],
    queryFn: () =>
      classesAPI.getStudents(selectedClass).then((res) => res.data.data),
    enabled: !!selectedClass,
  });

  // Sinf o'zgarganda o'quvchini tozalash
  useEffect(() => {
    setSelectedStudent("");
  }, [selectedClass]);

  if (classesLoading) return <LoaderCard className="h-96" />;

  return (
    <div className="grid grid-cols-4 gap-4 pb-24">
      {/* Left side */}
      <div className="relative">
        <Card
          title="Sinf va o'quvchi tanlang"
          className="sticky top-20 space-y-4"
        >
          <InputGroup>
            {/* Class */}
            <SelectField
              required
              label="Sinf"
              value={selectedClass}
              onChange={(v) => setSelectedClass(v)}
              options={classes.map((cls) => ({
                label: cls.name,
                value: cls._id,
              }))}
            />

            {/* Student */}
            <SelectField
              required
              label="O'quvchi"
              value={selectedStudent}
              disabled={!selectedClass}
              onChange={(v) => setSelectedStudent(v)}
              options={students.map((s) => ({
                label: `${s.firstName} ${s.lastName || ""}`.trim(),
                value: s._id,
              }))}
            />
          </InputGroup>
        </Card>
      </div>

      {/* Main */}
      <div className="col-span-2">
        {!selectedStudent ? (
          <Card>
            <div className="text-center py-16">
              <UserSearch
                className="size-16 text-gray-300 mx-auto mb-4"
                strokeWidth={1.5}
              />
              <p className="text-gray-500 text-lg">O'quvchini tanlang</p>
              <p className="text-gray-400 text-sm mt-1">
                Chapdan sinf va o'quvchini tanlab, ma'lumotlarni ko'ring
              </p>
            </div>
          </Card>
        ) : (
          <div className="space-y-4">
            <WeeklyStats studentId={selectedStudent} />
            <CoinBalance studentId={selectedStudent} />
          </div>
        )}
      </div>

      {/* Right Side */}
      <div className="relative">
        <SocialNetworks />
      </div>
    </div>
  );
};

export default StudentsPage;
