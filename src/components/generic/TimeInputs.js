import React from "react";
import Options from "../Inputs/Options";

const TimeInputs = ({
  onSetHours,
  onSetSeconds,
  onSetMinutes,
  hours,
  minutes,
  seconds,
}) => {
  const secarr = [...Array(60).keys()];
  secarr.shift();
  return (
    <>
      <div className="digital-display-wrapper">
        <Options
          options={[...Array(24).keys()]}
          onChange={onSetHours}
          current={hours || 0}
          name="Hours"
        />
        <Options
          options={[...Array(60).keys()]}
          onChange={onSetMinutes}
          current={minutes || 0}
          name="Minutes"
        />
        <Options
          options={secarr}
          onChange={onSetSeconds}
          current={seconds || 0}
          name="Seconds"
        />
      </div>
    </>
  );
};

export default TimeInputs;
