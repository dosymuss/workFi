import { useEffect, useRef, useState } from "react";
import styles from './ProfileAdressInp.module.scss';

const BirthdayInput = ({ title, titleStyle, date, setDate }) => {
  const dayRef = useRef(null);
  const monthRef = useRef(null);
  const yearRef = useRef(null);


  const handleDayChange = (e) => {
    const value = e.target.value.slice(0, 2); // максимум 2 символа
    setDate([value, date[1], date[2]]);
    if (value.length === 2) {
      monthRef.current?.focus();
    }
  };

  const handleMonthChange = (e) => {
    const value = e.target.value.slice(0, 2);
    setDate([date[0], value, date[2]]);
    if (value.length === 2) {
      yearRef.current?.focus();
    }
  };

  const handleYearChange = (e) => {
    const value = e.target.value.slice(0, 4);
    setDate([date[0], date[1], value]);
  };



  return (
    <div>
      <p className={styles.adressInpTitle} style={titleStyle ? titleStyle : null}>{title}</p>
      <div className={styles.inpWrap}>
        <input
          ref={dayRef}
          value={date[0]}
          onChange={handleDayChange}
          placeholder="dd"
        />
        <span>/</span>
        <input
          ref={monthRef}
          value={date[1]}
          onChange={handleMonthChange}
          placeholder="mm"
        />
        <span>/</span>
        <input
          ref={yearRef}
          value={date[2]}
          style={{ width: "70px" }}
          onChange={handleYearChange}
          placeholder="yyyy"
        />
      </div>
    </div >
  );
};

export default BirthdayInput;
