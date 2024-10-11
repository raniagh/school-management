import Announcement from "@/components/Announcement";
import BigCalendarContainer from "@/components/BigCalendarContainer";
import { currentUserId } from "@/lib/utils";
import React from "react";

const TeacherPage = () => {
  return (
    <div className='flex-1 p-4 flex gap-4 flex-col xl:flex-row '>
      {/* LEFT */}
      <div className='w-full  xl:w-2/3'>
        <div className='h-full bg-white p-4 rounded-md'>
          <h1 className='text-lg font-semibold'>Schedule</h1>
          <BigCalendarContainer type='teacher' id={currentUserId} />
        </div>
      </div>
      {/* RIGHT */}
      <div className='w-full xl:w-1/3 flex flex-col gap-8'>
        <Announcement />
      </div>
    </div>
  );
};

export default TeacherPage;
