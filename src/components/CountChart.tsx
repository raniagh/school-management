"use client";

import Image from "next/image";
import React from "react";

import { RadialBarChart, RadialBar, ResponsiveContainer } from "recharts";

const data = [
  {
    name: "Total",
    count: 106,
    pv: 2400,
    fill: "white",
  },
  {
    name: "Girls",
    count: 53,
    pv: 2400,
    fill: "#FAE27C",
  },
  {
    name: "Boys",
    count: 53,
    pv: 4567,
    fill: "#C3EBFA",
  },
];

const style = {
  top: "50%",
  right: 0,
  transform: "translate(0, -50%)",
  lineHeight: "24px",
};

const CountChart = () => {
  return (
    <div className='bg-white rounded-xl w-full h-full p-4'>
      {/* TITLE */}
      <div className='flex justify-between items-center'>
        <h1 className='text-lg font-semibold'>Students</h1>
        <Image src='/moreDark.png' alt='moreDark' width={20} height={20} />
      </div>
      {/* CHART */}
      <div className=' relative w-full h-[75%]'>
        <ResponsiveContainer width='100%' height='100%'>
          <RadialBarChart
            cx='50%'
            cy='50%'
            innerRadius='40%'
            outerRadius='100%'
            barSize={32}
            data={data}
          >
            <RadialBar background dataKey='count' />
          </RadialBarChart>
        </ResponsiveContainer>
        <Image
          src='/maleFemale.png'
          alt='malefemale'
          width={50}
          height={50}
          className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'
        />
      </div>
      {/* BOTTOM */}
      <div className='flex justify-center gap-16'>
        <div className='flex flex-col gap-1'>
          <div className='rounded-full bg-sky w-5 h-5'></div>
          <h1 className='font-bold'>623</h1>
          <h2 className='text-xs text-gray-300'>Boys</h2>
        </div>
        <div className='flex flex-col gap-1'>
          <div className='rounded-full bg-yellow w-5 h-5'></div>
          <h1 className='font-bold'>623</h1>
          <h2 className='text-xs text-gray-300'>Girls</h2>
        </div>
      </div>
    </div>
  );
};

export default CountChart;
