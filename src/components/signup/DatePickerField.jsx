"use client";

import { useEffect, useRef, useState } from "react";
import { Controller } from "react-hook-form";
import { DayPicker } from "@daypicker/react";

function formatDateForForm(date) {
  if (!date) return "";

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

function formatDateForDisplay(date) {
  if (!date) return "";

  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();

  return `${day}/${month}/${year}`;
}

function parseFormDate(value) {
  if (!value) return undefined;

  // Expected stored format: YYYY-MM-DD
  const match = value.match(/^(\d{4})-(\d{2})-(\d{2})$/);

  if (!match) return undefined;

  const [, year, month, day] = match;

  return new Date(
    Number(year),
    Number(month) - 1,
    Number(day)
  );
}

export default function DatePickerField({
  control,
  error,
}) {
  const [open, setOpen] = useState(false);

  const pickerRef = useRef(null);

  const today = new Date();

  // Remove time from today.
  const todayOnly = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate()
  );

  const startMonth = new Date(1900, 0, 1);

  const endMonth = new Date(
    todayOnly.getFullYear(),
    todayOnly.getMonth(),
    1
  );

  // Close when clicking outside.
  useEffect(() => {
    function handleOutsideClick(event) {
      if (
        pickerRef.current &&
        !pickerRef.current.contains(event.target)
      ) {
        setOpen(false);
      }
    }

    if (open) {
      document.addEventListener(
        "mousedown",
        handleOutsideClick
      );
    }

    return () => {
      document.removeEventListener(
        "mousedown",
        handleOutsideClick
      );
    };
  }, [open]);

  // Close with Escape.
  useEffect(() => {
    function handleEscape(event) {
      if (event.key === "Escape") {
        setOpen(false);
      }
    }

    if (open) {
      document.addEventListener(
        "keydown",
        handleEscape
      );
    }

    return () => {
      document.removeEventListener(
        "keydown",
        handleEscape
      );
    };
  }, [open]);

  return (
    <div
      className="form-field date-picker-field"
      ref={pickerRef}
    >
      <label htmlFor="dob">
        DOB
      </label>

      <Controller
        name="dob"
        control={control}
        render={({ field }) => {
          const selectedDate = parseFormDate(
            field.value
          );

          return (
            <>
              <div className="date-input-wrapper">
                <input
                  id="dob"
                  type="text"
                  readOnly
                  value={
                    selectedDate
                      ? formatDateForDisplay(
                          selectedDate
                        )
                      : ""
                  }
                  placeholder="Enter your Date of Birth"
                  onClick={() =>
                    setOpen((previous) => !previous)
                  }
                  aria-invalid={Boolean(error)}
                  aria-describedby={
                    error
                      ? "dob-error"
                      : undefined
                  }
                />

                <button
                  type="button"
                  className="calendar-button"
                  onClick={() =>
                    setOpen((previous) => !previous)
                  }
                  aria-label="Open date picker"
                  aria-expanded={open}
                >
                  📅
                </button>
              </div>

              {open && (
                <div
                  className="calendar-popover"
                  role="dialog"
                  aria-label="Date of birth calendar"
                >
                  <DayPicker
                    mode="single"

                    selected={selectedDate}

                    onSelect={(date) => {
                      if (!date) return;

                      field.onChange(
                        formatDateForForm(date)
                      );

                      setOpen(false);
                    }}

                    // Future dates cannot be selected.
                    disabled={{
                      after: todayOnly,
                    }}

                    // User can go back to 1900.
                    startMonth={startMonth}

                    // User cannot navigate beyond current month.
                    endMonth={endMonth}

                    // Month + year dropdowns.
                    captionLayout="dropdown"

                    // Start calendar at selected DOB.
                    defaultMonth={
                      selectedDate || todayOnly
                    }

                    fixedWeeks
                  />
                </div>
              )}

              {error && (
                <span
                  id="dob-error"
                  className="field-error"
                >
                  {error.message}
                </span>
              )}
            </>
          );
        }}
      />
    </div>
  );
}