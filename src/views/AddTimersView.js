import React, { useContext } from "react";
import Container from "../components/generic/Container";
import "./AddTimersView.css";
import { AppContext } from "../context/AppProvider";
import AnchorButton from "../components/buttons/AnchorButton";
import TimerCollection from "../components/generic/TimerCollection";
import QueueItem from "../components/generic/QueueItem";

function AddTimerView() {
  const { timerQueue, _removeFromQueue } = useContext(AppContext);
  
  return (
    <div className={`workflow-wrapper`}>
      <div className="multi-section-wrapper">
        <Container size="sm" height={300}>
          <div className="workout-header-wrapper">
            <h6>Workout Queue.</h6>
          </div>
          <div className="workout-queue-wrapper">
            {timerQueue.map((e,i) => (
              <QueueItem key={i} name={e.name} onDelete={() => {_removeFromQueue(i)}} />
            ))}
          </div>
          <div className="workout-action-wrapper">
            <AnchorButton to="/CSCI-E39-A3/" name={"Back to Queue."} size="sm" className="Action" onClick={()=>{}} />
          </div>
        </Container>
        <Container size="xl" height={300}>
          <TimerCollection />
        </Container>
      </div>
    </div>
  );
}

export default AddTimerView;
