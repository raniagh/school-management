import prisma from "@/lib/prisma";
import Image from "next/image";

const UserCard = async ({
  type,
}: {
  type: "admin" | "teacher" | "student" | "parent";
}) => {
  const modelMap: Record<typeof type, any> = {
    admin: prisma.admin,
    teacher: prisma.teacher,
    student: prisma.student,
    parent: prisma.parent,
  };

  const dataCount = await modelMap[type].count();

  return (
    <div className='rounded-2xl odd:bg-purple even:bg-yellow p-4 flex-1 min-w-[130px] '>
      <div className='flex justify-between items-center '>
        <span className='bg-white text-green-600 rounded-full px-2 py-1 text-[10px]'>
          2024/25
        </span>
        <Image src='/more.png' alt='more' width={20} height={20} />
      </div>
      <h1 className='text-2xl font-semibold my-4'>{dataCount}</h1>
      <h2 className='capitalize text-sm font-medium text-gray-500'>{type}s</h2>
    </div>
  );
};

export default UserCard;
