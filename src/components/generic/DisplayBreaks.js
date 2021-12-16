import React from "react";
import styled from "styled-components";
import Options from "../Inputs/Options";

const Title = styled.div`
  font-size: 30px;
`;


const DisplayBreaks = ({name, onSetHours, onSetMinutes, onSetSeconds, onConvertToTime}) => {
  return (
    <div>
      <Title>{name || "Title"}</Title>
      <div className="digital-display-wrapper">
        <Options
          options={[...Array(24).keys()]}
          onChange={onSetHours}
          name="Hours"
        />
        <Options
          options={[...Array(60).keys()]}
          onChange={onSetMinutes}
          name="Minutes"
        />
        <Options
          options={[...Array(60).keys()]}
          onChange={onSetSeconds}
          name="Seconds"
        />
      </div>
      <div className="Preview">{onConvertToTime()}</div>
    </div>
  );
};

export default DisplayBreaks;
