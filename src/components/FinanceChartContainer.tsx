import Image from "next/image";
import React from "react";

const FinanceChartContainer = () => {
  return (
    <div className='bg-white h-full rounded-lg p-4 '>
      {/* TITLE */}
      <div className='flex justify-between items-center'>
        <h1 className='text-lg font-semibold'>Finance</h1>
        <Image src='/moreDark.png' alt='moree' width={20} height={20} />
      </div>
    </div>
  );
};

export default FinanceChartContainer;
