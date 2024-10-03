import Announcement from "@/components/Announcement";
import BigCalendar from "@/components/BigCalendar";
import Performance from "@/components/Performance";
import SingleTeacherCard from "@/components/SingleTeacherCard";
import { teachersData } from "@/lib/data";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const SingleTeacherPage = ({ params }: { params: { id: string } }) => {
  const id = params.id;
  const teacher = teachersData.find((teacher) => teacher.teacherId === id);

  return (
    <div className='flex-1 p-4 flex gap-4 flex-col xl:flex-row '>
      {/*START LEFT */}

      <div className='w-full xl:w-2/3'>
        {/* START TOP */}
        <div className='flex flex-col lg:flex-row gap-4'>
          {/* USER INFO CARD */}
          <div className='flex-1 flex gap-4 bg-sky py-6 px-4 rounded-md'>
            <div className='w-1/3 '>
              <Image
                src={teacher?.photo}
                alt=''
                width={144}
                height={144}
                className='w-36 h-36 rounded-full object-cover'
              />
            </div>
            <div className='w-2/3 flex flex-col justify-between gap-4'>
              <h1 className='text-xl font-semibold'>{teacher?.name}</h1>
              <p className='text-sm text-gray-500'>Lorem bla blab bla</p>

              <div className='flex items-center justify-between gap-2 flex-wrap text-xs font-medium'>
                <div className='w-full md:w-1/3 lg:w-full 2xl:w-1/3 flex items-center gap-2 '>
                  <Image src='/blood.png' alt='blood' width={14} height={14} />
                  <h3>A+</h3>
                </div>
                <div className='w-full md:w-1/3 lg:w-full 2xl:w-1/3 flex items-center gap-2 '>
                  <Image src='/date.png' alt='date' width={14} height={14} />
                  <h3>January 2025</h3>
                </div>
                <div className='w-full md:w-1/3 lg:w-full 2xl:w-1/3 flex items-center gap-2 '>
                  <Image src='/mail.png' alt='' width={14} height={14} />
                  <h3>{teacher?.email}</h3>
                </div>
                <div className='w-full md:w-1/3 lg:w-full 2xl:w-1/3 flex items-center gap-2 '>
                  <Image src='/phone.png' alt='' width={14} height={14} />
                  <h3>{teacher?.phone}</h3>
                </div>
              </div>
            </div>
          </div>
          {/* SMALL CARDS */}
          <div className='flex-1 flex gap-4 justify-between flex-wrap '>
            <SingleTeacherCard
              imageSrc='/singleAttendance.png'
              cardCount='90%'
              cardName='Attendance'
            />
            <SingleTeacherCard
              imageSrc='/singleBranch.png'
              cardCount='2'
              cardName='Branches'
            />
            <SingleTeacherCard
              imageSrc='/singleLesson.png'
              cardCount='6'
              cardName='Lessons'
            />
            <SingleTeacherCard
              imageSrc='/singleClass.png'
              cardCount='6'
              cardName='Classes'
            />
          </div>
        </div>
        {/* Schedule*/}
        <div className='mt-4 bg-white rounded-md p-4 h-[800px]'>
          <h1>Teacher&apos;s Schedule</h1>
          <BigCalendar />
        </div>
      </div>

      {/*END LEFT */}
      {/* RIGHT */}
      <div className='w-full xl:w-1/3 flex flex-col gap-4'>
        {/* Shortcuts */}
        <div className='bg-white p-4 rounded-md'>
          <h1 className='text-xl font-semibold'>Shortcuts</h1>
          <div className='flex gap-4 flex-wrap mt-4 text-xs text-gray-500'>
            <Link className='p-3 rounded-md bg-skyLight' href='/'>
              Teacher&apos;s Classes
            </Link>
            <Link className='p-3 rounded-md bg-purpleLight' href='/'>
              Teacher&apos;s Students
            </Link>
            <Link className='p-3 rounded-md bg-yellowLight' href='/'>
              Teacher&apos;s Lessons
            </Link>
            <Link className='p-3 rounded-md bg-pink-50' href='/'>
              Teacher&apos;s Exams
            </Link>
            <Link className='p-3 rounded-md bg-skyLight' href='/'>
              Teacher&apos;s Assignments
            </Link>
          </div>
        </div>
        <Performance />
        <Announcement />
      </div>
    </div>
  );
};

export default SingleTeacherPage;
