import prisma from "@/lib/prisma";
import { currentUserId, role } from "@/lib/utils";
import React from "react";

const Announcement = async () => {
  const roleConditions = {
    teacher: { lessons: { some: { teacherId: currentUserId! } } },
    student: { students: { some: { id: currentUserId! } } },
    parent: { students: { some: { parentId: currentUserId! } } },
  };
  const announcements = await prisma.announcement.findMany({
    take: 3,
    orderBy: { date: "desc" },
    where: {
      ...(role !== "admin" && {
        OR: [
          { classId: null },
          {
            class: roleConditions[role as keyof typeof roleConditions] || {},
          },
        ],
      }),
    },
  });

  return (
    <div className='bg-white p-4 rounded-md'>
      <div className='flex justify-between items-center'>
        <h1 className='text-lg font-semibold my-4'>Announcements</h1>
        <span className='text-xs text-gray-400'>View All</span>
      </div>
      <div className='flex flex-col gap-4 mt-4'>
        {announcements[0] && (
          <div className='p-4 rounded-md bg-skyLight '>
            <div className='flex justify-between items-center '>
              <h2 className='font-medium'>{announcements[0].title}</h2>
              <span className='rounded-md bg-white p-1 text-xs text-gary-400'>
                {new Intl.DateTimeFormat("en-US").format(announcements[0].date)}
              </span>
            </div>
            <p className='text-sm text-gray-400 mt-1'>
              {announcements[0].description}
            </p>
          </div>
        )}

        {announcements[1] && (
          <div className='p-4 rounded-md bg-purpleLight '>
            <div className='flex justify-between items-center '>
              <h2 className='font-medium'>{announcements[1].title}</h2>
              <span className='rounded-md bg-white p-1 text-xs text-gary-400'>
                {new Intl.DateTimeFormat("en-US").format(announcements[1].date)}
              </span>
            </div>
            <p className='text-sm text-gray-400 mt-1'>
              {announcements[1].description}
            </p>
          </div>
        )}

        {announcements[2] && (
          <div className='p-4 rounded-md bg-yellowLight '>
            <div className='flex justify-between items-center '>
              <h2 className='font-medium'>{announcements[2].title}</h2>
              <span className='rounded-md bg-white p-1 text-xs text-gary-400'>
                {new Intl.DateTimeFormat("en-US").format(announcements[2].date)}
              </span>
            </div>
            <p className='text-sm text-gray-400 mt-1'>
              {announcements[2].description}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Announcement;
