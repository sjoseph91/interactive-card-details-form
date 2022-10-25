import React from "react";
import { useState } from "react";

const REQUIRED_MSG = "Field is required.";

const CardForm = ({
  setFormData,
  name,
  number,
  year,
  month,
  cvc,
  setValidSubmit,
}) => {
  const [errors, setErrors] = useState({
    nameError: null,
    numberError: null,
    monthError: null,
    yearError: null,
    cvcError: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Check name
    if (name === "" || !name) {
      setErrors((prev) => ({ ...prev, nameError: REQUIRED_MSG }));
    } else {
      setErrors((prev) => ({ ...prev, nameError: null }));
    }

    //check number
    if (number === "" || !number) {
      setErrors((prev) => ({ ...prev, numberError: REQUIRED_MSG }));
    } else if (!/^\d{16}$/.test(number)) {
      setErrors((prev) => ({
        ...prev,
        numberError: "Only 16 numbers allowed. ",
      }));
    } else {
      setErrors((prev) => ({ ...prev, numberError: null }));
    }

    //check month
    if (month === "" || !number) {
      setErrors((prev) => ({ ...prev, monthError: REQUIRED_MSG }));
    } else if (!/^(0[1-9]|1[0-2])$/.test(month)) {
      setErrors((prev) => ({
        ...prev,
        monthError: "Month must be be from 01 to 12 ",
      }));
    } else {
      setErrors((prev) => ({ ...prev, monthError: null }));
    }

    //check year
    if (year === "" || !year) {
      setErrors((prev) => ({ ...prev, yearError: REQUIRED_MSG }));
    } else if (!/^(2[2-9])|([3-9]\d)$/.test(year)) {
      setErrors((prev) => ({
        ...prev,
        yearError: "Year must be two digits, at least 22 ",
      }));
    } else {
      setErrors((prev) => ({ ...prev, yearError: null }));
    }

    //check cvc
    if (cvc === "" || !cvc) {
      setErrors((prev) => ({ ...prev, cvcError: REQUIRED_MSG }));
    } else if (!/^\d{3}$/.test(cvc)) {
      setErrors((prev) => ({
        ...prev,
        cvcError: "CVC must be 3 digits ",
      }));
    } else {
      setErrors((prev) => ({ ...prev, cvcError: null }));
    }

    //check for any errors
    //using setErrors function to get access to updated errors state
    setErrors((prevErrors) => {
      for (let key in prevErrors) {
        if (prevErrors[key]) {
          return prevErrors;
        }
      }
      setTimeout(() => {
        setValidSubmit(true);
      }, 500);
      return prevErrors;
    });
  };

  return (
    <form name="card-form" onSubmit={handleSubmit}>
      <label className="block" htmlFor="name">
        cardholder name
      </label>
      <input
        className={errors.nameError ? "error" : null}
        type="text"
        name="name"
        placeholder="e.g. Jane Appleseed"
        value={name}
        onChange={handleChange}
      />
      {errors.nameError && <div className="error">{errors.nameError}</div>}
      <label className="block" htmlFor="number">
        card number
      </label>
      <input
        className={errors.numberError ? "error" : null}
        type="text"
        name="number"
        placeholder="e.g. 1234 5678 9123 0000"
        value={number}
        onChange={handleChange}
      />
      {errors.numberError && <div className="error">{errors.numberError}</div>}
      <div className="date-and-cvc">
        <div className="date">
          <label className="block">exp.date (mm/yy)</label>
          <div className="flex">
            <input
              className={errors.monthError ? "error" : null}
              type="number"
              name="month"
              placeholder="MM"
              value={month}
              onChange={handleChange}
            />
            <input
              className={errors.yearError ? "error" : null}
              type="number"
              name="year"
              placeholder="YY"
              value={year}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="cvc">
          <label className="block" htmlFor="cvc">
            cvc
          </label>
          <input
            className={errors.cvcError ? "error" : null}
            type="number"
            name="cvc"
            value={cvc}
            onChange={handleChange}
            placeholder="e.g. 123"
          />
          {errors.cvcError && <div className="error">{errors.cvcError}</div>}
        </div>
      </div>
      {errors.monthError && <div className="error">{errors.monthError}</div>}
      {errors.yearError && <div className="error">{errors.yearError}</div>}

      <button>Confirm</button>
    </form>
  );
};

export default CardForm;
