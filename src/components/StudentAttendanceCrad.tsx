import prisma from "@/lib/prisma";
import SingleTeacherCard from "./SingleTeacherCard";

const StudentAttendanceCrad = async ({ id }: { id: string }) => {
  const attendances = await prisma.attendance.findMany({
    where: {
      studentId: id,
      date: {
        gte: new Date(new Date().getFullYear(), 0, 1),
      },
    },
  });
  const totalDays = attendances.length;
  const presentDays = attendances.filter((day) => day.present).length;
  const percentage = (presentDays / totalDays) * 100;

  return (
    <SingleTeacherCard
      imageSrc='/singleAttendance.png'
      cardCount={`${percentage}%` || "-"}
      cardName='Attendance'
    />
  );
};

export default StudentAttendanceCrad;
