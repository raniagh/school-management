import prisma from "@/lib/prisma";
import BigCalendar from "./BigCalendar";
import { adjustScheduleToCurrentWeek } from "@/lib/utils";

const BigCalendarContainer = async ({
  type,
  id,
}: {
  type: "teacher" | "class";
  id: string | number;
}) => {
  const lessons = await prisma.lesson.findMany({
    where: {
      ...(type === "teacher"
        ? { teacherId: id as string }
        : { classId: id as number }),
    },
  });

  const data = lessons.map((lesson) => ({
    title: lesson.name,
    start: lesson.startTime,
    end: lesson.endTime,
  }));

  const schedule = adjustScheduleToCurrentWeek(data);

  return <BigCalendar data={schedule} />;
};

export default BigCalendarContainer;
