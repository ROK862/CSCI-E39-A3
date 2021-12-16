import React, { useContext } from "react";
import styled from "styled-components";
import { AppContext } from "../context/AppProvider";
import { APP_ICONS } from "../context/settings";
import Container from "../components/generic/Container";
import AnchorButton from "../components/buttons/AnchorButton";
import "./DashboardView.css";
import { _queueToTotalDuration } from "../utils/helpers";
import TimerCollection from "../components/generic/TimerCollection";
import DisIcon from "../components/generic/DisIcon";

const Timers = styled.div`
  align-items: center;
  width: 100%;
  height: 100%;
  display: inline-block;
`;

function DashboardView() {
  const { timerQueue, status, onInitializeTimerQueue, _removeFromQueue } = useContext(AppContext);
  const duration = _queueToTotalDuration({queue:timerQueue})

  return (
    <div className={`workflow-wrapper`}>
      <Timers>
        <Container>
          {(status === "active") && <>
          <div className="timer-queue-headers-xl">
            <h6>Workout Schedule.</h6>
            <p>Should last for about <strong style={{color:"#0073c5"}}>{duration}</strong>.</p>
          </div>
          <div className="timer-queue-list-xl">
            {timerQueue.map((e,i) => {
              return (
                  <div key={`1_${i}`} className="timer-queue-item-xl">
                    <div key={`2_${i}`} className="sections-1x3-xl"><DisIcon size={"sm"} icon={APP_ICONS.QUEUE} /></div>
                    <div key={`3_${i}`} className="sections-2x3-xl standard-text">{e.name}</div>
                    <div key={`4_${i}`} className="sections-3x3-xl"><AnchorButton icon={APP_ICONS.DELETE} size="sm" radious="cl" onClick={()=>{_removeFromQueue(i)}} /></div>
                  </div>
              );
            })}
          </div>
          <div className="timer-queue-actions-xl">
          <AnchorButton to="/CSCI-E39-A3/add" name={"+"} size="sm" radious="cl" onClick={()=>{}} />
          <AnchorButton icon={APP_ICONS.PLAY} size="sm" radious="cl" onClick={()=>{onInitializeTimerQueue()}} />
          </div>
          </>}
          {(status !== "active") && <TimerCollection subTitle={""} />}
        </Container>
      </Timers>
      <br />
      <br />
      <br />
    </div>
  );
}

export default DashboardView;
