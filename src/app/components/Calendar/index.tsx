"use client";
import { add, format } from "date-fns";
import { useState } from "react";
import { Calendar } from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { CLOSING_HOURS, INTERVAL, OPENING_HOURS } from "~/utils/config";

interface MyDateProps {
  currentDate: Date | null;
  dateTime: Date | null;
}

const MyCalendar = ({}) => {
  const [date, setDate] = useState<MyDateProps>({
    currentDate: null,
    dateTime: null,
  });

  const getTimes = () => {
    if (!date.currentDate) return;

    const { currentDate } = date;
    const opening = add(currentDate, { hours: OPENING_HOURS });
    const closing = add(currentDate, { hours: CLOSING_HOURS });

    const times = [];
    for (let i = opening; i <= closing; i = add(i, { minutes: INTERVAL })) {
      times.push(i);
    }
    return times;
  };

  const pickedTime = getTimes();

  return (
    <div>
      {date.currentDate ? (
        <div className="flex gap-4">
          {pickedTime?.map((time, idx) => (
            <div key={`time-${idx}`} className="rounded bg-gray-200 p-2">
              <button
                onClick={() => setDate((prev) => ({ ...prev, dateTime: time }))}
              >
                {format(time, "kk:mm")}
              </button>
            </div>
          ))}
        </div>
      ) : (
        <Calendar
          minDate={new Date()}
          className="p-2"
          view="month"
          onClickDay={(date) =>
            setDate((prev) => ({ ...prev, currentDate: date }))
          }
        />
      )}
    </div>
  );
};

export default MyCalendar;
