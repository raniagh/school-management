import Announcement from "@/components/Announcement";
import BigCalendarContainer from "@/components/BigCalendarContainer";
import FormModal from "@/components/FormModal";
import Performance from "@/components/Performance";
import SingleTeacherCard from "@/components/SingleTeacherCard";
import StudentAttendanceCrad from "@/components/StudentAttendanceCrad";
import prisma from "@/lib/prisma";
import { Class, Student } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import React, { Suspense } from "react";

const SingleStudentPage = async ({
  params: { id },
}: {
  params: { id: string };
}) => {
  const student:
    | (Student & { class: Class & { _count: { lessons: number } } })
    | null = await prisma.student.findUnique({
    where: { id },
    include: {
      class: {
        include: {
          _count: {
            select: {
              lessons: true,
            },
          },
        },
      },
    },
  });

  if (!student) {
    return notFound();
  }

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
                src={student.img || "/noAvatar.png"}
                alt=''
                width={144}
                height={144}
                className='w-36 h-36 rounded-full object-cover'
              />
            </div>
            <div className='w-2/3 flex flex-col justify-between gap-4'>
              <div className='flex items-center gap-4'>
                <h1 className='text-xl font-semibold'>
                  {student.name + " " + student.surname}
                </h1>
                <FormModal table='student' type='update' data={student} />
              </div>
              <p className='text-sm text-gray-500'>Lorem bla blab bla</p>

              <div className='flex items-center justify-between gap-2 flex-wrap text-xs font-medium'>
                <div className='w-full md:w-1/3 lg:w-full 2xl:w-1/3 flex items-center gap-2 '>
                  <Image src='/blood.png' alt='blood' width={14} height={14} />
                  <h3>{student.bloodType}</h3>
                </div>
                <div className='w-full md:w-1/3 lg:w-full 2xl:w-1/3 flex items-center gap-2 '>
                  <Image src='/date.png' alt='date' width={14} height={14} />
                  <h3>{new Intl.DateTimeFormat("en-US").format(new Date())}</h3>
                </div>
                <div className='w-full md:w-1/3 lg:w-full 2xl:w-1/3 flex items-center gap-2 '>
                  <Image src='/mail.png' alt='' width={14} height={14} />
                  <h3>{student.email || "-"}</h3>
                </div>
                <div className='w-full md:w-1/3 lg:w-full 2xl:w-1/3 flex items-center gap-2 '>
                  <Image src='/phone.png' alt='' width={14} height={14} />
                  <h3>{student.phone || "-"}</h3>
                </div>
              </div>
            </div>
          </div>
          {/* SMALL CARDS */}
          <div className='flex-1 flex gap-4 justify-between flex-wrap '>
            <Suspense fallback='loading...'>
              <StudentAttendanceCrad id={student.id} />
            </Suspense>
            <SingleTeacherCard
              imageSrc='/singleBranch.png'
              cardCount={`${student.class.name.charAt(0)}th`}
              cardName='Grade'
            />
            <SingleTeacherCard
              imageSrc='/singleLesson.png'
              cardCount={student.class._count.lessons}
              cardName='Lessons'
            />
            <SingleTeacherCard
              imageSrc='/singleClass.png'
              cardCount={student.class.name}
              cardName='Class'
            />
          </div>
        </div>
        {/* Schedule*/}
        <div className='mt-4 bg-white rounded-md p-4 h-[800px]'>
          <h1>Student&apos;s Schedule</h1>
          <BigCalendarContainer type='class' id={student.class.id} />
        </div>
      </div>

      {/*END LEFT */}
      {/* RIGHT */}
      <div className='w-full xl:w-1/3 flex flex-col gap-4'>
        {/* Shortcuts */}
        <div className='bg-white p-4 rounded-md'>
          <h1 className='text-xl font-semibold'>Shortcuts</h1>
          <div className='flex gap-4 flex-wrap mt-4 text-xs text-gray-500'>
            <Link
              className='p-3 rounded-md bg-skyLight'
              href={`/list/lessons?classId=${2}`}
            >
              Student&apos;s Lessons
            </Link>
            <Link
              className='p-3 rounded-md bg-purpleLight'
              href={`/list/teachers?classId=${2}`}
            >
              Student&apos;s Teachers
            </Link>
            <Link
              className='p-3 rounded-md bg-yellowLight'
              href={`/list/results?studentId=${"student2"}`}
            >
              Student&apos;s Results
            </Link>
            <Link
              className='p-3 rounded-md bg-pink-50'
              href={`/list/exams?classId=${2}`}
            >
              Student&apos;s Exams
            </Link>
            <Link
              className='p-3 rounded-md bg-skyLight'
              href={`/list/assignments?classId=${2}`}
            >
              Student&apos;s Assignments
            </Link>
          </div>
        </div>
        <Performance />
        <Announcement />
      </div>
    </div>
  );
};

export default SingleStudentPage;
