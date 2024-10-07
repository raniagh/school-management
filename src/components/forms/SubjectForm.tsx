"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import InputField from "../InputField";
import { subjectSchema, SubjectSchema } from "@/lib/formValidationSchemas";

const SubjectForm = ({
  type,
  data,
}: {
  type: "create" | "update";
  data?: any;
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SubjectSchema>({
    resolver: zodResolver(subjectSchema),
  });

  const onSubmit = handleSubmit((data) => {
    console.log(data);
  });

  return (
    <form className='flex flex-col gap-8' onSubmit={onSubmit}>
      <h1 className='text-xl font-semibold'>
        {type === "create" ? "Create a new subject" : "Update the subject"}
      </h1>

      <div className='flex justify-between flex-wrap gap-4'>
        <InputField
          label='Subject name'
          name='name'
          defaultValue={data?.name}
          register={register}
          error={errors?.name}
        />
        {data && (
          <InputField
            label='Id'
            name='id'
            defaultValue={data?.id}
            register={register}
            error={errors?.id}
          />
        )}
        <div className='flex flex-col gap-2 w-full md:w-1/4'>
          <label className='text-xs text-gray-500'>Teachers</label>
          <select
            multiple
            className='ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full'
            {...register("teachers")}
            defaultValue={data?.teachers}
          >
            {/*  {teachers.map(
              (teacher: { id: string; name: string; surname: string }) => (
                <option value={teacher.id} key={teacher.id}>
                  {teacher.name + " " + teacher.surname}
                </option>
              )
            )} */}
          </select>
          {errors.teachers?.message && (
            <p className='text-xs text-red-400'>
              {errors.teachers.message.toString()}
            </p>
          )}
        </div>
      </div>
      {/* {state.error && (
        <span className='text-red-500'>Something went wrong!</span>
      )} */}
      <button className='bg-blue-400 text-white p-2 rounded-md'>
        {type === "create" ? "Create" : "Update"}
      </button>
    </form>
  );
};

export default SubjectForm;
