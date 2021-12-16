import React, { useContext } from "react";
import AnchorButton from "../buttons/AnchorButton";
import { AppContext } from "../../context/AppProvider";

const TimerGoal = () => {
  const { setTimerStatus } = useContext(AppContext);

  return (
    <>
      <div className="Timer-Goal-Wrapper">
        <img alt="timer-goal" src="https://raw.githubusercontent.com/prof-tejera/assignment-3-ROK862/main/src/images/goal-reached-animation.gif" />
      </div>
      <AnchorButton name="Reset Timer" onClick={()=>setTimerStatus("active")} />
    </>
  );
}

export default TimerGoal