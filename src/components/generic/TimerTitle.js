import React from "react";
import "./TimerTitle.css";

const TimerTitle = ({children}) => {
  return (<>
    <div className="timer-title-wrapper">
        {children}
    </div>
  </>);
}

export default TimerTitle;
