"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import InputField from "../InputField";
import Image from "next/image";
import { studentSchema, StudentSchema } from "@/lib/formValidationSchemas";
import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction, useEffect } from "react";
import { toast } from "react-toastify";
import { createStudent, updateStudent } from "@/lib/actions";
import { useFormState } from "react-dom";

const StudentForm = ({
  type,
  data,
  setOpen,
  relatedData,
}: {
  type: "create" | "update";
  data?: any;
  setOpen: Dispatch<SetStateAction<boolean>>;
  relatedData?: any;
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<StudentSchema>({
    resolver: zodResolver(studentSchema),
  });

  const [state, formAction] = useFormState(
    type === "create" ? createStudent : updateStudent,
    {
      success: false,
      error: false,
    }
  );

  const onSubmit = handleSubmit((data) => {
    formAction(data);
  });
  const router = useRouter();

  useEffect(() => {
    if (state.success) {
      toast(`Subject has been ${type === "create" ? "created" : "updated"}`);
      setOpen(false);
      router.refresh();
    }
  }, [state]);

  return (
    <form className='flex flex-col gap-8' onSubmit={onSubmit}>
      <h1 className='text-xl font-semibold'>
        {type === "create" ? "Create a new student" : "Update the student"}
      </h1>
      <span className='text-xs text-gray-400 font-medium'>
        Authentication Information
      </span>
      <div className='flex justify-between flex-wrap gap-4'>
        <InputField
          label='Username'
          name='username'
          defaultValue={data?.username}
          register={register}
          error={errors?.username}
        />
        <InputField
          label='Email'
          name='email'
          defaultValue={data?.email}
          register={register}
          error={errors?.email}
        />
        <InputField
          label='Password'
          name='password'
          defaultValue={data?.password}
          register={register}
          error={errors?.password}
        />
      </div>
      <span className='text-xs text-gray-400 font-medium'>
        Personal Information
      </span>
      <div className='flex justify-between flex-wrap gap-4'>
        <InputField
          label='First Name'
          name='name'
          defaultValue={data?.firstName}
          register={register}
          error={errors.name}
        />
        <InputField
          label='Last Name'
          name='surname'
          defaultValue={data?.lastName}
          register={register}
          error={errors.surname}
        />
        <InputField
          label='Phone'
          name='phone'
          defaultValue={data?.phone}
          register={register}
          error={errors.phone}
        />
        <InputField
          label='Address'
          name='address'
          defaultValue={data?.address}
          register={register}
          error={errors.address}
        />
        <InputField
          label='Blood Type'
          name='bloodType'
          defaultValue={data?.bloodType}
          register={register}
          error={errors.bloodType}
        />
        <InputField
          label='Birthday'
          name='birthday'
          defaultValue={data?.birthday}
          register={register}
          error={errors.birthday}
          type='date'
        />

        <div className='flex flex-col gap-2 w-full md:w-1/4'>
          <label className='text-xs text-gray-500'>Sex</label>
          <select
            className='ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full'
            {...register("sex")}
            defaultValue={data?.sex}
          >
            <option value='male'>Male</option>
            <option value='female'>Female</option>
          </select>
          {errors.sex?.message && (
            <p className='text-xs text-red-400'>
              {errors.sex.message.toString()}
            </p>
          )}
        </div>

        <div className='flex flex-col gap-2 w-full md:w-1/4 justify-center'>
          <label
            className='text-xs text-gray-500 flex items-center gap-2 cursor-pointer'
            htmlFor='img'
          >
            <Image src='/upload.png' alt='' width={28} height={28} />
            <span>Upload a photo</span>
          </label>
          <input type='file' id='img' {...register("img")} className='hidden' />
          {errors.img?.message && (
            <p className='text-xs text-red-400'>
              {errors.img.message.toString()}
            </p>
          )}
        </div>
      </div>
      <button className='bg-blue-400 text-white p-2 rounded-md'>
        {type === "create" ? "Create" : "Update"}
      </button>
    </form>
  );
};

export default StudentForm;
