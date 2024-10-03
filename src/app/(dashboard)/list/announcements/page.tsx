import Pagination from "@/components/Pagination";
import Table from "@/components/Table";
import TableSearch from "@/components/TableSearch";
import { announcementsData, role } from "@/lib/data";
import Image from "next/image";
import Link from "next/link";
import React from "react";

type Announcement = {
  id: number;
  title: string;
  class: string;
  date: string;
};

const columns = [
  { header: "Title", accessor: "title" },
  {
    header: "Class",
    accessor: "class",
  },
  {
    header: "Date",
    accessor: "date",
    className: "hidden md:table-cell",
  },

  {
    header: "Actions",
    accessor: "actions",
  },
];

const AnnouncementsListPage = () => {
  const renderRow = (item: Announcement) => (
    <tr
      key={item.id}
      className='border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-purpleLight '
    >
      <td className='p-4'>{item.title}</td>
      <td>{item.class}</td>
      <td className='hidden md:table-cell'>{item.date}</td>

      <td>
        <div className='flex items-center gap-2'>
          <Link href={`/list/subjects/${item.id}`}>
            <button className='w-7 h-7 flex items-center justify-center rounded-full bg-sky'>
              <Image src='/edit.png' alt='edit' width={16} height={16} />
            </button>
          </Link>
          {role === "admin" && (
            <button className='w-7 h-7 flex items-center justify-center rounded-full bg-purple'>
              <Image src='/delete.png' alt='delete' width={16} height={16} />
            </button>
          )}
        </div>
      </td>
    </tr>
  );

  return (
    <div className='flex-1 bg-white m-4 mt-0 rounded-md p-4'>
      {/* TOP */}
      <div className='flex justify-between items-center'>
        <h1 className='hidden md:block font-semibold text-lg'>
          All Announcements
        </h1>
        <div className='flex flex-col md:flex-row items-center gap-4 w-full md:w-auto'>
          <TableSearch />
          <div className='flex items-center gap-4 self-end'>
            <button className='w-8 h-8 flex items-center justify-center rounded-full bg-yellow '>
              <Image src='/filter.png' alt='filter' height={14} width={14} />
            </button>
            <button className='w-8 h-8 flex items-center justify-center rounded-full bg-yellow '>
              <Image src='/sort.png' alt='sort' height={14} width={14} />
            </button>
            {role === "admin" && (
              <button className='w-8 h-8 flex items-center justify-center rounded-full bg-yellow '>
                <Image src='/plus.png' alt='plus' height={14} width={14} />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* LIST */}
      <Table columns={columns} renderRow={renderRow} data={announcementsData} />
      {/* PAGINATION */}
      <Pagination />
    </div>
  );
};

export default AnnouncementsListPage;
