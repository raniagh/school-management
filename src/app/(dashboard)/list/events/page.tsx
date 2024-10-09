import FormModal from "@/components/FormModal";
import Pagination from "@/components/Pagination";
import Table from "@/components/Table";
import TableSearch from "@/components/TableSearch";
import { role } from "@/lib/data";
import prisma from "@/lib/prisma";
import { ITEM_PER_PAGE } from "@/lib/settings";
import { Class, Event, Prisma } from "@prisma/client";
import Image from "next/image";

import React from "react";

type EventList = Event & { class: Class };

const renderRow = (item: EventList) => (
  <tr
    key={item.id}
    className='border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-purpleLight '
  >
    <td className='p-4'>{item.title}</td>
    <td>{item.class.name}</td>
    <td className='hidden md:table-cell'>
      {new Intl.DateTimeFormat("en-US").format(item.startTime)}
    </td>
    <td className='hidden md:table-cell'>
      {item.startTime.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      })}
    </td>
    <td className='hidden md:table-cell'>
      {item.endTime.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      })}
    </td>

    <td>
      <div className='flex items-center gap-2'>
        {role === "admin" && (
          <>
            <FormModal table='event' type='update' data={item} />
            <FormModal table='event' type='delete' id={item.id} />
          </>
        )}
      </div>
    </td>
  </tr>
);

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
    header: "Start Time",
    accessor: "startTime",
    className: "hidden md:table-cell",
  },
  {
    header: "End Time",
    accessor: "endTime",
    className: "hidden md:table-cell",
  },
  {
    header: "Actions",
    accessor: "actions",
  },
];

const EventsListPage = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) => {
  const { page, ...queryParams } = searchParams;
  const p = page ? parseInt(page) : 1;

  //URL PARAMS CONDITION
  const query: Prisma.EventWhereInput = {};

  if (queryParams) {
    for (const [key, value] of Object.entries(queryParams)) {
      if (value !== undefined) {
        switch (key) {
          case "search":
            query.title = { contains: value, mode: "insensitive" };
            break;
          default:
            break;
        }
      }
    }
  }
  const [events, count] = await prisma.$transaction([
    prisma.event.findMany({
      where: query,
      include: {
        class: { select: { name: true } },
      },

      take: ITEM_PER_PAGE,
      skip: ITEM_PER_PAGE * (p - 1),
    }),
    prisma.event.count({ where: query }),
  ]);

  return (
    <div className='flex-1 bg-white m-4 mt-0 rounded-md p-4'>
      {/* TOP */}
      <div className='flex justify-between items-center'>
        <h1 className='hidden md:block font-semibold text-lg'>All Events</h1>
        <div className='flex flex-col md:flex-row items-center gap-4 w-full md:w-auto'>
          <TableSearch />
          <div className='flex items-center gap-4 self-end'>
            <button className='w-8 h-8 flex items-center justify-center rounded-full bg-yellow '>
              <Image src='/filter.png' alt='filter' height={14} width={14} />
            </button>
            <button className='w-8 h-8 flex items-center justify-center rounded-full bg-yellow '>
              <Image src='/sort.png' alt='sort' height={14} width={14} />
            </button>
            {role === "admin" && <FormModal table='event' type='create' />}
          </div>
        </div>
      </div>

      {/* LIST */}
      <Table columns={columns} renderRow={renderRow} data={events} />
      {/* PAGINATION */}
      <Pagination page={p} count={count} />
    </div>
  );
};

export default EventsListPage;
