import React, { useState } from 'react';
import './calendario.css';

interface CalendarProps {
  minDate?: Date;
  maxDate?: Date;
  initialDate?: Date;
  onDateSelect?: (date: Date) => void;
  disabledDates?: Date[];
}

const Calendar: React.FC<CalendarProps> = ({
  minDate,
  maxDate,
  initialDate,
  onDateSelect,
  disabledDates = [],
}) => {
  const [currentDate, setCurrentDate] = useState(initialDate || new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(initialDate || null);

  const getDaysInMonth = (year: number, month: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const changeMonth = (direction: 'prev' | 'next') => {
    const newDate = new Date(currentDate);
    if (direction === 'prev') {
      newDate.setMonth(currentDate.getMonth() - 1);
    } else {
      newDate.setMonth(currentDate.getMonth() + 1);
    }
    setCurrentDate(newDate);
  };

  const isDateDisabled = (year: number, month: number, day: number): boolean => {
    return disabledDates.some(
      (date) =>
        date.getFullYear() === year && date.getMonth() === month && date.getDate() === day
    );
  };

  const isDateEnabled = (year: number, month: number, day: number): boolean => {
    const date = new Date(year, month, day);
    const isWithinRange = (!minDate || date >= minDate) && (!maxDate || date <= maxDate);

    return isWithinRange && !isDateDisabled(year, month, day);
  };

  const handleDateClick = (day: number) => {
    const selected = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
    if (isDateEnabled(currentDate.getFullYear(), currentDate.getMonth(), day)) {
      setSelectedDate(selected);
      if (onDateSelect) {
        onDateSelect(selected);
      }
    }
  };

  const handleDayInteraction = (day: number) => {
    if (isDateEnabled(currentDate.getFullYear(), currentDate.getMonth(), day)) {
      handleDateClick(day);
    }
  };

  const daysInMonth = getDaysInMonth(currentDate.getFullYear(), currentDate.getMonth());

  const daysArray = [...Array(daysInMonth)].map((_, i) => ({ day: i + 1 }));

  return (
    <div className="d-flex justify-content-center">
      <div className="calendar-container">
        <div className="calendar-header">
          <div className="calendar-controls">
            <div
              className="arrow-left"
              onPointerDown={() => changeMonth('prev')}
              style={{ cursor: 'pointer' }}
            ></div>
          </div>
          <h5>
            {currentDate.toLocaleString('default', { month: 'long', year: 'numeric' })}
          </h5>
          <div className="calendar-controls">
            <div
              className="arrow-right"
              onPointerDown={() => changeMonth('next')}
              style={{ cursor: 'pointer' }}
            ></div>
          </div>
        </div>

        <div className="calendar-days">
          <span>L</span>
          <span>M</span>
          <span>M</span>
          <span>J</span>
          <span>V</span>
          <span>S</span>
          <span>D</span>
        </div>

        <div className="calendar-dates">
          {daysArray.map(({ day }, index) => (
            <span
              key={index}
              className={`
                ${
                  selectedDate &&
                  selectedDate.getDate() === day &&
                  selectedDate.getMonth() === currentDate.getMonth() &&
                  selectedDate.getFullYear() === currentDate.getFullYear()
                    ? 'selected'
                    : ''
                }
              `}
              onClick={() => handleDayInteraction(day)}
              onTouchStart={() => handleDayInteraction(day)}
              style={{
                cursor: isDateEnabled(currentDate.getFullYear(), currentDate.getMonth(), day)
                  ? 'pointer'
                  : 'not-allowed',
                pointerEvents: isDateEnabled(currentDate.getFullYear(), currentDate.getMonth(), day)
                  ? 'auto'
                  : 'none',
                opacity: isDateEnabled(currentDate.getFullYear(), currentDate.getMonth(), day)
                  ? 1
                  : 0.5,
              }}
            >
              {day}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Calendar;
