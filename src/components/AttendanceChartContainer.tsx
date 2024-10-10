import Image from "next/image";
import React from "react";
import AttendanceChart from "./AttendanceChart";
import prisma from "@/lib/prisma";

const AttendanceChartContainer = async () => {
  const today = new Date();
  const dayOfWeek = today.getDay();
  // dayOfWeek =0 its sunday
  const daysSinceMonday = dayOfWeek === 0 ? 6 : dayOfWeek - 1;

  const lastMonday = new Date(today);
  lastMonday.setDate(today.getDate() - daysSinceMonday);

  //Return date and present status of all attendances that starts from lastMonday
  const attendanceData = await prisma.attendance.findMany({
    where: {
      date: {
        //greater than lastMonday
        gte: lastMonday,
      },
    },
    select: { date: true, present: true },
  });

  const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri"];
  const attendanceMap: { [key: string]: { present: number; absent: number } } =
    {};
  // Initialize attendanceMap dynamically
  daysOfWeek.forEach((day) => {
    attendanceMap[day] = { present: 0, absent: 0 };
  });

  attendanceData.forEach((item) => {
    // Get the day of the week for each attendance entry
    const attendanceDayOfWeek = item.date.getDay();
    //with this condition we are sure that we are in the day weeks
    if (dayOfWeek >= 1 && dayOfWeek < 5) {
      const dayName = daysOfWeek[attendanceDayOfWeek - 1];

      if (item.present) {
        attendanceMap[dayName].present++;
      } else {
        attendanceMap[dayName].absent++;
      }
    }
  });
  //Prepare the final data array
  const data = daysOfWeek.map((day) => ({
    name: day,
    present: attendanceMap[day].present,
    absent: attendanceMap[day].absent,
  }));

  return (
    <div className='bg-white h-full rounded-lg p-4 '>
      {/* TITLE */}
      <div className='flex justify-between items-center'>
        <h1 className='text-lg font-semibold'>Attendance</h1>
        <Image src='/moreDark.png' alt='moree' width={20} height={20} />
      </div>
      {/* CHART */}
      <AttendanceChart data={data} />
    </div>
  );
};

export default AttendanceChartContainer;
