"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

const EventCalendar = () => {
  const [value, setValue] = useState<Value>(new Date());
  const router = useRouter();

  const handleChange = (newValue: typeof value) => {
    setValue(newValue);

    if (newValue instanceof Date) {
      router.push(`?date=${newValue}`);
    }
  };

  return <Calendar onChange={handleChange} value={value} />;
};

export default EventCalendar;
