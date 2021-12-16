import React, { useContext } from "react";
import AnchorButton from "../buttons/AnchorButton";
import TimerRenderer from "../generic/TimerRenderer";
import TimerDisplay from "../generic/TimerDisplay";
import PauseDisplay from "../generic/PauseDisplay";
import TimerGoal from "../generic/TimerGoal";
import { AppContext } from "../../context/AppProvider";

// swap between functionalities depending on the status value.
const RenderState = () => {
    const {setTimerStatus, status} = useContext(AppContext)
    return (
      <>
      {status==="queue" && <AnchorButton name="Add to queue" onClick={() => setTimerStatus("active")}/>}
      {status==="inactive" && <AnchorButton name="Start Now" onClick={() => setTimerStatus("active")}/>}
      {status==="active" && <TimerRenderer />}
      {status==="paused" && <PauseDisplay />}
      {status==="timing" && <TimerDisplay />}
      {status==="complete" && <TimerGoal />}
      </>
    );
  };

export default RenderState;