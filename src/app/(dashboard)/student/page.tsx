import Announcement from "@/components/Announcement";
import BigCalendarContainer from "@/components/BigCalendarContainer";
import EventCalendar from "@/components/EventCalendar";
import prisma from "@/lib/prisma";
import { currentUserId } from "@/lib/utils";
import React from "react";

const StudentPage = async () => {
  const classItem = await prisma.class.findMany({
    where: {
      students: { some: { id: currentUserId! } },
    },
  });

  return (
    <div className='p-4 flex gap-4 flex-col xl:flex-row '>
      {/* LEFT */}
      <div className='w-full  xl:w-2/3'>
        <div className='h-full bg-white p-4 rounded-md'>
          <h1 className='text-lg font-semibold'>Schedule (4A)</h1>
          <BigCalendarContainer type='class' id={classItem[0].id} />
        </div>
      </div>
      {/* RIGHT */}
      <div className='w-full xl:w-1/3 flex flex-col gap-8'>
        <EventCalendar />
        <Announcement />
      </div>
    </div>
  );
};

export default StudentPage;
