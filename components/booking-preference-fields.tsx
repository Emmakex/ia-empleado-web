"use client";

import { useMemo } from "react";
import {
  BOOKING_SLOT_TIMES,
  BOOKING_TIME_ZONE,
  getBookingDateBounds,
  isBookingDateAllowed,
} from "../lib/booking-preference";

type BookingPreferenceFieldsProps = {
  date: string;
  time: string;
  disabled: boolean;
  onDateChange: (value: string) => void;
  onTimeChange: (value: string) => void;
  labels: {
    eyebrow: string;
    title: string;
    description: string;
    pending: string;
    weekdayError: string;
    timeError: string;
    dateLabel: string;
    timeLabel: string;
  };
};

export function BookingPreferenceFields({
  date,
  time,
  disabled,
  onDateChange,
  onTimeChange,
  labels,
}: BookingPreferenceFieldsProps) {
  const bounds = useMemo(() => getBookingDateBounds(), []);

  return (
    <fieldset className="lead-booking-preference" data-booking-preference>
      <legend className="sr-only">{labels.title}</legend>
      <div className="lead-booking-heading">
        <p className="eyebrow">{labels.eyebrow}</p>
        <h3>{labels.title}</h3>
        <p>{labels.description}</p>
      </div>

      <div className="lead-booking-date-row">
        <label htmlFor="lead-preferred-date">
          <span>{labels.dateLabel}</span>
          <input
            id="lead-preferred-date"
            name="preferredDate"
            type="date"
            required
            min={bounds.min}
            max={bounds.max}
            value={date}
            disabled={disabled}
            data-booking-date
            onInvalid={(event) => {
              if (event.currentTarget.validity.valueMissing) return;
              if (event.currentTarget.value && !isBookingDateAllowed(event.currentTarget.value)) {
                event.currentTarget.setCustomValidity(labels.weekdayError);
              }
            }}
            onChange={(event) => {
              const next = event.currentTarget.value;
              event.currentTarget.setCustomValidity(
                next && !isBookingDateAllowed(next) ? labels.weekdayError : "",
              );
              onDateChange(next);
            }}
          />
        </label>
        <div className="lead-booking-timezone" aria-label={`Timezone ${BOOKING_TIME_ZONE}`}>
          <span aria-hidden="true">◷</span>
          <div>
            <strong>{BOOKING_TIME_ZONE}</strong>
            <small>UTC+1 / UTC+2</small>
          </div>
        </div>
      </div>

      <fieldset className="lead-booking-time-fieldset">
        <legend>{labels.timeLabel}</legend>
        <div className="lead-booking-time-grid" data-booking-time-grid>
          {BOOKING_SLOT_TIMES.map((slot) => (
            <label key={slot} className={time === slot ? "is-selected" : undefined}>
              <input
                type="radio"
                name="preferredTime"
                value={slot}
                required
                checked={time === slot}
                disabled={disabled}
                aria-label={`${labels.timeLabel} ${slot}`}
                onInvalid={(event) => {
                  if (!time) event.currentTarget.setCustomValidity(labels.timeError);
                }}
                onChange={(event) => {
                  event.currentTarget.setCustomValidity("");
                  if (event.currentTarget.checked) onTimeChange(slot);
                }}
              />
              <span>{slot}</span>
            </label>
          ))}
        </div>
      </fieldset>

      <p className="lead-booking-pending" role="note">
        <span aria-hidden="true">i</span>
        {labels.pending}
      </p>
    </fieldset>
  );
}
