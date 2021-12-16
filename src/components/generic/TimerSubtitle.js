import React from "react";
import "./TimerSubtitle.css";

const TimerSubtitle = ({children}) => {
  return (<>
    <div className="timer-subtitle-wrapper">
        {children}
    </div>
  </>);
}

export default TimerSubtitle;
