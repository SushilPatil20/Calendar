import { useEffect, useState } from "react";
import {
  days,
  getCurrentMonth,
  getCurrentYear,
  getCurrentDay,
  months,
} from "./utils/script";

function App() {
  const [dates, setDates] = useState([]);
  const [currentMonth, setCurrentMonth] = useState(getCurrentMonth);
  const [currentYear, setCurrentYear] = useState(getCurrentYear);

  const increseMonth = () => {
    const newMonth = currentMonth < 11 ? currentMonth + 1 : 0;
    setCurrentMonth(newMonth);
  };
  const decreseMonth = () => {
    const newMonth = currentMonth > 0 ? currentMonth - 1 : months.length - 1;
    setCurrentMonth(newMonth);
  };

  useEffect(() => {
    const newDates = [];
    const year = currentYear;
    const month = currentMonth;

    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    for (let i = 0; i < firstDay.getDay(); i++) {
      newDates.push(null);
    }
    setDates([...dates, ...newDates]);

    for (let day = 1; day <= lastDay.getDate(); day++) {
      newDates.push(day);
    }
    setDates([...newDates]);
  }, [currentMonth]);

  return (
    <>
      <header className="text-center">
        <h1 className="text-6xl font-thin my-12">Calendar</h1>
      </header>
      <section className="px-8 md:w-1/2 md:mx-auto">
        <section className="flex items-center justify-between h-10 py-8">
          <span className="text-xl md:text-4xl">{currentYear}</span>
          <div className="space-x-2 md:space-x-4">
            <button
              className="md:text-4xl text-gray-800"
              onClick={decreseMonth}
            >
              <iconify-icon icon="bxs:left-arrow"></iconify-icon>
            </button>
            <span className="md:text-2xl">{months[currentMonth]}</span>
            <button
              className="md:text-4xl text-gray-800"
              onClick={increseMonth}
            >
              <iconify-icon icon="bxs:right-arrow"></iconify-icon>
            </button>
          </div>
        </section>
        <section className="w-full grid grid-cols-7">
          {days.map((day, index) => (
            <section
              key={index}
              className={`h-14 flex text-sm items-center justify-center border bg-black text-white border-gray-500`}
            >
              {day}
            </section>
          ))}
          {dates.map((date, index) => (
            <section
              key={index}
              className={`${
                getCurrentDay === date
                  ? "bg-blue-700 text-white font-semibold"
                  : ""
              } h-14 flex text-xl items-center justify-center border`}
            >
              {date}
            </section>
          ))}
        </section>
      </section>
    </>
  );
}

export default App;
