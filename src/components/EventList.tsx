import prisma from "@/lib/prisma";
import React from "react";

const EventList = async ({ dateParam }: { dateParam: string | undefined }) => {
  const date = dateParam ? new Date(dateParam) : new Date();

  const events = await prisma.event.findMany({
    where: {
      startTime: {
        gte: new Date(date.setHours(0, 0, 0, 0)),
        lte: new Date(date.setHours(23, 59, 59, 999)),
      },
    },
  });

  return (
    <div>
      {events.map((event) => (
        <div
          key={event.id}
          className='p-5 rounded-md border-2 border-gray-100 border-t-4 odd:border-t-sky even:border-t-purple '
        >
          <div className='flex justify-between items-center '>
            <h1 className='font-semibold text-gray-600'>{event.title}</h1>
            <span className='text-xs text-gray-300'>
              {event.startTime.toLocaleTimeString("en-US", {
                hour: "2-digit",
                minute: "2-digit",
                hour12: false,
              })}
            </span>
          </div>
          <p className='mt-2 text-gray-400 text-sm'>{event.description}</p>
        </div>
      ))}
    </div>
  );
};

export default EventList;
