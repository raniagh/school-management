import FormModal from "@/components/FormModal";
import Pagination from "@/components/Pagination";
import Table from "@/components/Table";
import TableSearch from "@/components/TableSearch";
import prisma from "@/lib/prisma";
import { ITEM_PER_PAGE } from "@/lib/settings";
import { role } from "@/lib/utils";
import { Class, Prisma, Student } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import React from "react";

type StudentList = Student & { class: Class };

const columns = [
  { header: "Info", accessor: "info" },
  {
    header: "Student ID",
    accessor: "studentId",
    className: "hidden md:table-cell",
  },
  {
    header: "Grade",
    accessor: "grade",
    className: "hidden md:table-cell",
  },
  {
    header: "Phone",
    accessor: "phone",
    className: "hidden md:table-cell",
  },
  {
    header: "Address",
    accessor: "address",
    className: "hidden md:table-cell",
  },
  {
    header: "Actions",
    accessor: "actions",
  },
];

const renderRow = (item: StudentList) => (
  <tr
    key={item.id}
    className='border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-purpleLight'
  >
    <td className='flex items-center gap-4 p-4'>
      <Image
        src={item.img || "/noAvatar.png"}
        alt='user'
        width={40}
        height={40}
        className='w-10 h-10 rounded-full object-cover'
      />
      <div className='flex flex-col'>
        <h3 className='font-semibold'>{item.name}</h3>
        <p className='text-xs text-gray-500'>{item.class.name}</p>
      </div>
    </td>
    <td className='hidden md:table-cell'>{item.username}</td>
    <td className='hidden md:table-cell'>{item.class.name[0]}</td>
    <td className='hidden md:table-cell'>{item.phone}</td>
    <td className='hidden md:table-cell'>{item.address}</td>
    <td>
      <div className='flex items-center gap-2'>
        <Link href={`/list/students/${item.id}`}>
          <button className='w-7 h-7 flex items-center justify-center rounded-full bg-sky'>
            <Image src='/view.png' alt='view' width={16} height={16} />
          </button>
        </Link>
        {role === "admin" && (
          <FormModal table='student' type='delete' id={item.id} />
        )}
      </div>
    </td>
  </tr>
);

const StudentsListPage = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) => {
  const { page, ...queryParams } = searchParams;
  const p = page ? parseInt(page) : 1;

  //URL PARAMS CONDITION
  const query: Prisma.StudentWhereInput = {};

  if (queryParams) {
    for (const [key, value] of Object.entries(queryParams)) {
      if (value !== undefined) {
        switch (key) {
          case "teacherId": {
            query.class = {
              lessons: {
                some: {
                  teacherId: value,
                },
              },
            };
            break;
          }
          case "search":
            query.name = { contains: value, mode: "insensitive" };
            break;
          default:
            break;
        }
      }
    }
  }
  const [students, count] = await prisma.$transaction([
    prisma.student.findMany({
      where: query,
      include: { class: true },
      take: ITEM_PER_PAGE,
      skip: ITEM_PER_PAGE * (p - 1),
    }),
    prisma.student.count({ where: query }),
  ]);

  return (
    <div className='flex-1 bg-white m-4 mt-0 rounded-md p-4'>
      {/* TOP */}
      <div className='flex justify-between items-center'>
        <h1 className='hidden md:block font-semibold text-lg'>All Students</h1>
        <div className='flex flex-col md:flex-row items-center gap-4 w-full md:w-auto'>
          <TableSearch />
          <div className='flex items-center gap-4 self-end'>
            <button className='w-8 h-8 flex items-center justify-center rounded-full bg-yellow '>
              <Image src='/filter.png' alt='filter' height={14} width={14} />
            </button>
            <button className='w-8 h-8 flex items-center justify-center rounded-full bg-yellow '>
              <Image src='/sort.png' alt='sort' height={14} width={14} />
            </button>
            {role === "admin" && <FormModal table='student' type='create' />}
          </div>
        </div>
      </div>

      {/* LIST */}
      <Table columns={columns} renderRow={renderRow} data={students} />
      {/* PAGINATION */}
      <Pagination page={p} count={count} />
    </div>
  );
};

export default StudentsListPage;
