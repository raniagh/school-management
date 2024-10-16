import Image from "next/image";
import React from "react";

const SingleTeacherCard = ({
  imageSrc,
  cardCount,
  cardName,
}: {
  imageSrc: string;
  cardCount: number | string;
  cardName: string;
}) => {
  return (
    <div className='bg-white p-4 rounded-md flex gap-4 w-full md:w-[48%] xl:w-[45%]'>
      <Image src={imageSrc} alt='' width={24} height={24} className='w-6 h-6' />
      <div>
        <h1 className='text-xl font-semibold'>{cardCount}</h1>
        <span className='text-sm text-gray-400'>{cardName}</span>
      </div>
    </div>
  );
};

export default SingleTeacherCard;
