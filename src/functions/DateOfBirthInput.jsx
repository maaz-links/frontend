import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react";

const DateOfBirthInput = forwardRef(({
    isReadOnly = false,
    initialValues= "", 
    bodyClass = "flex space-x-2", 
    fieldClass = "w-full h-15 text-md px-5 sm:text-2xl border-2 border-gray-300 focus:outline-0 rounded-2xl" 
    }, ref = useRef()) => {
        const [y, m, d] = (() => {
            const regex = /^(\d{4})-(\d{2})-(\d{2})$/;
            const match = initialValues.match(regex);
            return match ? [match[1], match[2], match[3]] : ["", "", ""];
          })();
    
  const [day, setDay] = useState(d);
  const [month, setMonth] = useState(m);
  const [year, setYear] = useState(y);
  const [daysInMonth, setDaysInMonth] = useState(31);

  // Months data
  const months = [
    { value: '01', name: 'January' },
    { value: '02', name: 'February' },
    { value: '03', name: 'March' },
    { value: '04', name: 'April' },
    { value: '05', name: 'May' },
    { value: '06', name: 'June' },
    { value: '07', name: 'July' },
    { value: '08', name: 'August' },
    { value: '09', name: 'September' },
    { value: '10', name: 'October' },
    { value: '11', name: 'November' },
    { value: '12', name: 'December' },
  ];

  // Generate days based on current month and year
  const days = Array.from({ length: daysInMonth }, (_, i) => {
    const dayNum = i + 1;
    return dayNum < 10 ? `0${dayNum}` : `${dayNum}`;
  });

  // Generate years (from current year - 100 to current year)
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 100 }, (_, i) => `${currentYear - i}`);

  // Update days in month when month or year changes
  useEffect(() => {
    if (month && year) {
      const isLeapYear = (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
      let days = 31;

      if (month === '04' || month === '06' || month === '09' || month === '11') {
        days = 30;
      } else if (month === '02') {
        days = isLeapYear ? 29 : 28;
      }

      setDaysInMonth(days);

      // Reset day if it's now invalid for the new month
      if (day && parseInt(day) > days) {
        setDay('');
      }
    }
  }, [month, year, day]);

  // Expose the date value via ref
  useImperativeHandle(ref, () => ({
    getDate: () => {
      if (day && month && year) {
        return {
          day,
          month,
          year,
          formatted: `${year}-${month}-${day}`,
          isValid: true
        };
      }
      return {
        day: '',
        month: '',
        year: '',
        formatted: '',
        isValid: false
      };
    }
  }));

  return (

    <div className={`${bodyClass}`}>
    <select
        value={day}
        onChange={(e) => setDay(e.target.value)}
        className={`${fieldClass} appearance-none`}
        disabled={isReadOnly}
    >
        <option value="">Giorno</option>
        {days.map((d) => (
        <option key={d} value={d}>{d}</option>
        ))}
    </select>

    <select
        value={month}
        onChange={(e) => setMonth(e.target.value)}
        className={`${fieldClass} appearance-none`}
        disabled={isReadOnly}
    >
        <option value="">Mese</option>
        {months.map((m) => (
        <option key={m.value} value={m.value}>{m.name}</option>
        ))}
    </select>

    <select
        value={year}
        onChange={(e) => setYear(e.target.value)}
        className={`${fieldClass} appearance-none`}
        disabled={isReadOnly}
    >
        <option value="">Anno</option>
        {years.map((y) => (
        <option key={y} value={y}>{y}</option>
        ))}
    </select>
    </div>
  );
});

export default DateOfBirthInput;