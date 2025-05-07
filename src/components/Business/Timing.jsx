import React, { useState, useEffect } from "react";
import { Button, TimePicker, message } from "antd";
import dayjs from "dayjs";
import { useUpdateBusinessMutation } from "../../redux/services/businessApi";

const BusinessTiming = ({ data, businessId, onCancel }) => {
  const [updateBusiness, { isLoading }] = useUpdateBusinessMutation();
  // Initializing states with default values
  const [timings, setTimings] = useState({
    monday: { open: null, close: null },
    tuesday: { open: null, close: null },
    wednesday: { open: null, close: null },
    thursday: { open: null, close: null },
    friday: { open: null, close: null },
    saturday: { open: null, close: null },
    sunday: { open: null, close: null },
  });

  const [is24x7, setIs24x7] = useState(false);
  const [lunchBreaks, setLunchBreaks] = useState({
    monday: { start: null, end: null },
    tuesday: { start: null, end: null },
    wednesday: { start: null, end: null },
    thursday: { start: null, end: null },
    friday: { start: null, end: null },
    saturday: { start: null, end: null },
    sunday: { start: null, end: null },
  });

  const [specialTimings, setSpecialTimings] = useState({
    holiday: { start: null, end: null },
  });

  useEffect(() => {
    if (data?.data?.operatingHours) {
      const {
        timings: incomingTimings,
        lunchBreaks: incomingLunchBreaks,
        specialTimings: incomingSpecialTimings,
        is24x7: incomingIs24x7,
      } = data?.data?.operatingHours;

      // Set state
      setTimings(incomingTimings || {});
      setLunchBreaks(incomingLunchBreaks || {});
      setSpecialTimings(incomingSpecialTimings || {});
      setIs24x7(incomingIs24x7 || false);
    }
  }, [data]);
  console.log("Incoming Timings:", timings);

  const handleTimeChange = (day, type, time) => {
    setTimings((prev) => ({
      ...prev,
      [day]: {
        ...prev[day],
        [type]: time || null, // Ensure no undefined values are set
      },
    }));
  };

  const handleLunchBreakChange = (day, type, time) => {
    setLunchBreaks((prev) => ({
      ...prev,
      [day]: {
        ...prev[day],
        [type]: time || null, // Ensure no undefined values are set
      },
    }));
  };

  const handleHolidayChange = (type, time) => {
    setSpecialTimings((prev) => ({
      ...prev,
      holiday: {
        ...prev.holiday,
        [type]: time || null, // Ensure no undefined values are set
      },
    }));
  };

  const handleWeekendToggle = () => {
    setTimings((prevTimings) => ({
      ...prevTimings,
      saturday: prevTimings.friday,
      sunday: prevTimings.friday,
    }));
  };

  const handleSave = async () => {
    try {
      if (!businessId) {
        message.error("Business ID is missing!");
        return;
      }

      const operatingHours = {
        timings,
        lunchBreaks,
        specialTimings,
        is24x7,
      };

      const response = await updateBusiness({
        id: businessId,
        updatedData: {
          operatingHours,
        },
      }).unwrap();

      console.log("Business operating hours updated:", response);
      message.success("Business operating hours updated successfully!");
    } catch (error) {
      console.error("Failed to update timings:", error);
      message.error(
        error?.data?.message || "Failed to update business timings"
      );
    }
  };
  console.log(timings["wednesday"]);
  const handleCancel = () => {
    if (onCancel) onCancel();
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold mb-4">Business Hours</h2>

      {/* 24/7 Business Checkbox */}
      <div className="flex items-center mb-6">
        <input
          type="checkbox"
          checked={is24x7}
          onChange={() => setIs24x7(!is24x7)}
          className="mr-2"
        />
        <label>Open 24/7</label>
      </div>

      {/* {!is24x7 && (
        <>
          {/* Weekdays Timings */}
      {/* {[
            "monday",
            "tuesday",
            "wednesday",
            "thursday",
            "friday",
            "saturday",
            "sunday",
          ].map((day) => (
            console.log(day, "open time:", timings[day]?.open); // 👈 Console log here

            <div className="flex justify-between items-center mb-4" key={day}>
              <label className="w-1/4">
                {day.charAt(0).toUpperCase() + day.slice(1)}
              </label>
              <div className="flex items-center w-3/4">
                <TimePicker
                  value={timings[day]?.open ? dayjs(timings[day]?.open) : null} // Optional chaining to avoid undefined
                  onChange={(time) => handleTimeChange(day, "open", time)}
                  format="HH:mm"
                  className="mr-4"
                />
                <span className="mx-2">-</span>
                <TimePicker
                  value={
                    timings[day]?.close ? dayjs(timings[day]?.close) : null
                  } // Optional chaining to avoid undefined
                  onChange={(time) => handleTimeChange(day, "close", time)}
                  format="HH:mm"
                />
              </div>
            </div>
          ))}
        </>
      )} */}
      {!is24x7 && (
        <>
          {[
            "monday",
            "tuesday",
            "wednesday",
            "thursday",
            "friday",
            "saturday",
            "sunday",
          ].map((day) => {
            console.log(day, "open time:", timings[day]?.open); // 👈 Console log here

            return (
              <div className="flex justify-between items-center mb-4" key={day}>
                <label className="w-1/4">
                  {day.charAt(0).toUpperCase() + day.slice(1)}
                </label>
                <div className="flex items-center w-3/4">
                  <TimePicker
                    value={
                      timings[day]?.open ? dayjs(timings[day]?.open) : null
                    }
                    onChange={(time) => handleTimeChange(day, "open", time)}
                    format="HH:mm"
                    className="mr-4"
                  />
                  <span className="mx-2">-</span>
                  <TimePicker
                    value={
                      timings[day]?.close ? dayjs(timings[day]?.close) : null
                    }
                    onChange={(time) => handleTimeChange(day, "close", time)}
                    format="HH:mm"
                  />
                </div>
              </div>
            );
          })}
        </>
      )}

      {/* Lunch Breaks */}
      <div className="mt-6 mb-4">
        <h3 className="font-semibold">Lunch Breaks</h3>
        {[
          "monday",
          "tuesday",
          "wednesday",
          "thursday",
          "friday",
          "saturday",
          "sunday",
        ].map((day) => (
          <div className="flex justify-between items-center mb-4" key={day}>
            <label className="w-1/4">
              {day.charAt(0).toUpperCase() + day.slice(1)} Lunch
            </label>
            <div className="flex items-center w-3/4">
              <TimePicker
                value={
                  lunchBreaks[day]?.start
                    ? dayjs(lunchBreaks[day]?.start)
                    : null
                } // Optional chaining to avoid undefined
                onChange={(time) => handleLunchBreakChange(day, "start", time)}
                format="HH:mm"
                className="mr-4"
              />
              <span className="mx-2">-</span>
              <TimePicker
                value={
                  lunchBreaks[day]?.end ? dayjs(lunchBreaks[day]?.end) : null
                } // Optional chaining to avoid undefined
                onChange={(time) => handleLunchBreakChange(day, "end", time)}
                format="HH:mm"
              />
            </div>
          </div>
        ))}
      </div>

      {/* Special Timings (Holiday) */}
      <div className="mt-6 mb-4">
        <h3 className="font-semibold">Special Timings (Holiday)</h3>
        <div className="flex justify-between items-center mb-4">
          <label className="w-1/4">Holiday</label>
          <div className="flex items-center w-3/4">
            <TimePicker
              value={
                specialTimings.holiday?.start
                  ? dayjs(specialTimings.holiday?.start)
                  : null
              } // Optional chaining to avoid undefined
              onChange={(time) => handleHolidayChange("start", time)}
              format="HH:mm"
              className="mr-4"
            />
            <span className="mx-2">-</span>
            <TimePicker
              value={
                specialTimings.holiday?.end
                  ? dayjs(specialTimings.holiday?.end)
                  : null
              } // Optional chaining to avoid undefined
              onChange={(time) => handleHolidayChange("end", time)}
              format="HH:mm"
            />
          </div>
        </div>
      </div>

      {/* Save and Cancel Buttons */}
      <div className="flex justify-end gap-4 mt-6">
        <Button type="primary" onClick={handleSave} loading={isLoading}>
          Save
        </Button>
        <Button onClick={handleCancel} className="bg-gray-300 text-gray-700">
          Cancel
        </Button>
      </div>
    </div>
  );
};

export default BusinessTiming;
