import FormModal from "@/components/FormModal";
import Pagination from "@/components/Pagination";
import Table from "@/components/Table";
import TableSearch from "@/components/TableSearch";
import prisma from "@/lib/prisma";
import { ITEM_PER_PAGE } from "@/lib/settings";
import { role } from "@/lib/utils";
import { Class, Lesson, Prisma, Subject, Teacher } from "@prisma/client";
import Image from "next/image";

import React from "react";

type LessonList = Lesson & { subject: Subject } & { class: Class } & {
  teacher: Teacher;
};

const renderRow = (item: LessonList) => (
  <tr
    key={item.id}
    className='border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-purpleLight '
  >
    <td className='p-4'>{item.subject.name}</td>
    <td>{item.class.name}</td>
    <td className='hidden md:table-cell'>
      {item.teacher.name + " " + item.teacher.surname}
    </td>

    <td>
      <div className='flex items-center gap-2'>
        {role === "admin" && (
          <>
            <FormModal table='lesson' type='update' data={item} />
            <FormModal table='lesson' type='delete' id={item.id} />
          </>
        )}
      </div>
    </td>
  </tr>
);

const columns = [
  { header: "Subject Name", accessor: "subject" },
  {
    header: "Class",
    accessor: "class",
  },
  {
    header: "Teacher",
    accessor: "teacher",
    className: "hidden md:table-cell",
  },
  ...(role === "admin"
    ? [
        {
          header: "Actions",
          accessor: "actions",
        },
      ]
    : []),
];

const LessonsListPage = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) => {
  const { page, ...queryParams } = searchParams;
  const p = page ? parseInt(page) : 1;

  //URL PARAMS CONDITION
  const query: Prisma.LessonWhereInput = {};

  if (queryParams) {
    for (const [key, value] of Object.entries(queryParams)) {
      if (value !== undefined) {
        switch (key) {
          case "teacherId": {
            query.teacherId === value;
            break;
          }
          case "classId": {
            query.classId = parseInt(value);
            break;
          }
          case "search":
            query.OR = [
              { subject: { name: { contains: value, mode: "insensitive" } } },
              { teacher: { name: { contains: value, mode: "insensitive" } } },
            ];
            break;
          default:
            break;
        }
      }
    }
  }
  const [lessons, count] = await prisma.$transaction([
    prisma.lesson.findMany({
      where: query,
      include: {
        class: { select: { name: true } },
        subject: { select: { name: true } },
        teacher: { select: { name: true, surname: true } },
      },
      take: ITEM_PER_PAGE,
      skip: ITEM_PER_PAGE * (p - 1),
    }),
    prisma.lesson.count({ where: query }),
  ]);

  return (
    <div className='flex-1 bg-white m-4 mt-0 rounded-md p-4'>
      {/* TOP */}
      <div className='flex justify-between items-center'>
        <h1 className='hidden md:block font-semibold text-lg'>All Lessons</h1>
        <div className='flex flex-col md:flex-row items-center gap-4 w-full md:w-auto'>
          <TableSearch />
          <div className='flex items-center gap-4 self-end'>
            <button className='w-8 h-8 flex items-center justify-center rounded-full bg-yellow '>
              <Image src='/filter.png' alt='filter' height={14} width={14} />
            </button>
            <button className='w-8 h-8 flex items-center justify-center rounded-full bg-yellow '>
              <Image src='/sort.png' alt='sort' height={14} width={14} />
            </button>
            {role === "admin" && <FormModal table='lesson' type='create' />}
          </div>
        </div>
      </div>

      {/* LIST */}
      <Table columns={columns} renderRow={renderRow} data={lessons} />
      {/* PAGINATION */}
      <Pagination page={p} count={count} />
    </div>
  );
};

export default LessonsListPage;
