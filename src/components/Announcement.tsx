import React from "react";

const Announcement = () => {
  return (
    <div className='bg-white p-4 rounded-md'>
      <div className='flex justify-between items-center'>
        <h1 className='text-lg font-semibold my-4'>Announcements</h1>
        <span className='text-xs text-gray-400'>View All</span>
      </div>
      <div className='flex flex-col gap-4 mt-4'>
        <div className='p-4 rounded-md bg-skyLight '>
          <div className='flex justify-between items-center '>
            <h2 className='font-medium'>Lorem ipsum dolor sit</h2>
            <span className='rounded-md bg-white p-1 text-xs text-gary-400'>
              2025-01-01
            </span>
          </div>
          <p className='text-sm text-gray-400 mt-1'>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </p>
        </div>

        <div className='p-4 rounded-md bg-purpleLight '>
          <div className='flex justify-between items-center '>
            <h2 className='font-medium'>Lorem ipsum dolor sit</h2>
            <span className='rounded-md bg-white p-1 text-xs text-gary-400'>
              2025-01-01
            </span>
          </div>
          <p className='text-sm text-gray-400 mt-1'>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </p>
        </div>

        <div className='p-4 rounded-md bg-yellowLight '>
          <div className='flex justify-between items-center '>
            <h2 className='font-medium'>Lorem ipsum dolor sit</h2>
            <span className='rounded-md bg-white p-1 text-xs text-gary-400'>
              2025-01-01
            </span>
          </div>
          <p className='text-sm text-gray-400 mt-1'>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Announcement;
