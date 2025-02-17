import Announcement from "@/components/Announcement";
import BigCalendarContainer from "@/components/BigCalendarContainer";
import FormContainer from "@/components/FormContainer";
import Performance from "@/components/Performance";
import SingleTeacherCard from "@/components/SingleTeacherCard";
import prisma from "@/lib/prisma";
import { getAuth } from "@clerk/nextjs/server";
import { Teacher } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

const SingleTeacherPage = async ({
  params: { id },
  context,
}: {
  params: { id: string };
  context: any;
}) => {
  const { sessionClaims } = await getAuth(context.req);
  const role = (sessionClaims?.metadata as { role?: string })?.role;

  const teacher:
    | (Teacher & {
        _count: { subjects: number; lessons: number; classes: number };
      })
    | null = await prisma.teacher.findUnique({
    where: { id },
    include: {
      _count: {
        select: {
          subjects: true,
          lessons: true,
          classes: true,
        },
      },
    },
  });

  if (!teacher) {
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
                src={teacher.img || "/noAvatar.png"}
                alt=''
                width={144}
                height={144}
                className='w-36 h-36 rounded-full object-cover'
              />
            </div>
            <div className='w-2/3 flex flex-col justify-between gap-4'>
              <div className='flex items-center gap-4'>
                <h1 className='text-xl font-semibold'>
                  {teacher.name + " " + teacher.surname}
                </h1>
                {role === "admin" && (
                  <FormContainer table='teacher' type='update' data={teacher} />
                )}
              </div>
              <p className='text-sm text-gray-500'>Lorem bla blab bla</p>

              <div className='flex items-center justify-between gap-2 flex-wrap text-xs font-medium'>
                <div className='w-full md:w-1/3 lg:w-full 2xl:w-1/3 flex items-center gap-2 '>
                  <Image src='/blood.png' alt='blood' width={14} height={14} />
                  <h3>{teacher.bloodType}</h3>
                </div>
                <div className='w-full md:w-1/3 lg:w-full 2xl:w-1/3 flex items-center gap-2 '>
                  <Image src='/date.png' alt='date' width={14} height={14} />
                  <h3>
                    {new Intl.DateTimeFormat("en-US").format(teacher.birthday)}
                  </h3>
                </div>
                <div className='w-full md:w-1/3 lg:w-full 2xl:w-1/3 flex items-center gap-2 '>
                  <Image src='/mail.png' alt='' width={14} height={14} />
                  <h3>{teacher.email || "-"}</h3>
                </div>
                <div className='w-full md:w-1/3 lg:w-full 2xl:w-1/3 flex items-center gap-2 '>
                  <Image src='/phone.png' alt='' width={14} height={14} />
                  <h3>{teacher.phone || "-"}</h3>
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
              cardCount={teacher._count.subjects}
              cardName='Branches'
            />
            <SingleTeacherCard
              imageSrc='/singleLesson.png'
              cardCount={teacher._count.lessons}
              cardName='Lessons'
            />
            <SingleTeacherCard
              imageSrc='/singleClass.png'
              cardCount={teacher._count.classes}
              cardName='Classes'
            />
          </div>
        </div>
        {/* Schedule*/}
        <div className='mt-4 bg-white rounded-md p-4 h-[800px]'>
          <h1>Teacher&apos;s Schedule</h1>
          <BigCalendarContainer type='teacher' id={teacher.id} />
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
              href={`/list/classes?supervisorId=${"teacher2"}`}
            >
              Teacher&apos;s Classes
            </Link>
            <Link
              className='p-3 rounded-md bg-purpleLight'
              href={`/list/students?teacherId=${"teacher2"}`}
            >
              Teacher&apos;s Students
            </Link>
            <Link
              className='p-3 rounded-md bg-yellowLight'
              href={`/list/lessons?teacherId=${"teacher2"}`}
            >
              Teacher&apos;s Lessons
            </Link>
            <Link
              className='p-3 rounded-md bg-pink-50'
              href={`/list/exams?teacherId=${"teacher2"}`}
            >
              Teacher&apos;s Exams
            </Link>
            <Link
              className='p-3 rounded-md bg-skyLight'
              href={`/list/assignments?teacherId=${"teacher2"}`}
            >
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
