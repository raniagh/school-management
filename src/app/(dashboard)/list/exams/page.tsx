import FormContainer from "@/components/FormContainer";
import Pagination from "@/components/Pagination";
import Table from "@/components/Table";
import TableSearch from "@/components/TableSearch";
import prisma from "@/lib/prisma";
import { ITEM_PER_PAGE } from "@/lib/settings";
import { auth } from "@clerk/nextjs/server";
import { Class, Exam, Prisma, Subject, Teacher } from "@prisma/client";
import Image from "next/image";

import React from "react";

type ExamList = Exam & {
  lesson: {
    subject: Subject;
    class: Class;
    teacher: Teacher;
  };
};

const ExamsListPage = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) => {
  const { userId, sessionClaims } = auth();
  const role = (sessionClaims?.metadata as { role?: string })?.role;
  const currentUserId = userId;

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
    {
      header: "Date",
      accessor: "date",
      className: "hidden md:table-cell",
    },
    ...(role === "admin" || role === "teacher"
      ? [
          {
            header: "Actions",
            accessor: "actions",
          },
        ]
      : []),
  ];

  const renderRow = (item: ExamList) => (
    <tr
      key={item.id}
      className='border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-purpleLight '
    >
      <td className='p-4'>{item.lesson.subject.name}</td>
      <td>{item.lesson.class.name}</td>
      <td className='hidden md:table-cell'>
        {item.lesson.teacher.name + " " + item.lesson.teacher.surname}
      </td>
      <td className='hidden md:table-cell'>
        {new Intl.DateTimeFormat("en-US").format(item.startTime)}
      </td>

      <td>
        <div className='flex items-center gap-2'>
          {(role === "admin" || role === "teacher") && (
            <>
              <FormContainer table='exam' type='update' data={item} />
              <FormContainer table='exam' type='delete' id={item.id} />
            </>
          )}
        </div>
      </td>
    </tr>
  );

  const { page, ...queryParams } = searchParams;
  const p = page ? parseInt(page) : 1;

  //URL PARAMS CONDITION
  const query: Prisma.ExamWhereInput = {};
  query.lesson = {};

  if (queryParams) {
    for (const [key, value] of Object.entries(queryParams)) {
      if (value !== undefined) {
        switch (key) {
          case "teacherId": {
            query.lesson.teacherId = value;
            break;
          }
          case "classId": {
            query.lesson.classId = parseInt(value);
            break;
          }
          case "search":
            query.lesson.subject = {
              name: { contains: value, mode: "insensitive" },
            };
            break;
          default:
            break;
        }
      }
    }
  }

  //ROLE CONDITIONS
  //Fetch exams according to user role

  switch (role) {
    case "admin":
      break;
    case "teacher":
      query.lesson.teacherId = currentUserId!;
      break;
    case "student":
      query.lesson.class = {
        students: {
          some: {
            id: currentUserId!,
          },
        },
      };
      break;
    case "parent":
      query.lesson.class = {
        students: {
          some: {
            parentId: currentUserId!,
          },
        },
      };
      break;
  }

  const [exams, count] = await prisma.$transaction([
    prisma.exam.findMany({
      where: query,
      include: {
        lesson: {
          select: {
            subject: { select: { name: true } },
            teacher: { select: { name: true, surname: true } },
            class: { select: { name: true } },
          },
        },
      },
      take: ITEM_PER_PAGE,
      skip: ITEM_PER_PAGE * (p - 1),
    }),
    prisma.exam.count({ where: query }),
  ]);

  return (
    <div className='flex-1 bg-white m-4 mt-0 rounded-md p-4'>
      {/* TOP */}
      <div className='flex justify-between items-center'>
        <h1 className='hidden md:block font-semibold text-lg'>All Exams</h1>
        <div className='flex flex-col md:flex-row items-center gap-4 w-full md:w-auto'>
          <TableSearch />
          <div className='flex items-center gap-4 self-end'>
            <button className='w-8 h-8 flex items-center justify-center rounded-full bg-yellow '>
              <Image src='/filter.png' alt='filter' height={14} width={14} />
            </button>
            <button className='w-8 h-8 flex items-center justify-center rounded-full bg-yellow '>
              <Image src='/sort.png' alt='sort' height={14} width={14} />
            </button>
            {(role === "admin" || role === "teacher") && (
              <FormContainer table='exam' type='create' />
            )}
          </div>
        </div>
      </div>

      {/* LIST */}
      <Table columns={columns} renderRow={renderRow} data={exams} />
      {/* PAGINATION */}
      <Pagination page={p} count={count} />
    </div>
  );
};

export default ExamsListPage;
