import React from "react";
import PropTypes from "prop-types";
import AnchorButton from "../buttons/AnchorButton";
import { APP_ICONS } from "../../context/settings";
import "./TimerDisplay.css";

const TimerActionButtons = ({
  onPauseTimer,
  onSkipRound,
  onCloseTimer,
  onFastForward,
}) => {
  return (
    <>
      <div className="button-wrapper">
        <AnchorButton
          active={onPauseTimer !== undefined}
          icon={APP_ICONS.PAUSE}
          size={"sm"}
          radious="cl"
          onClick={() => onPauseTimer("paused")}
        />
        <AnchorButton
          active={onSkipRound !== undefined}
          icon={APP_ICONS.FAST_FORWARD}
          size={"sm"}
          radious="cl"
          onClick={() => onFastForward()}
        />
        <AnchorButton
          active={onCloseTimer !== undefined}
          icon={APP_ICONS.RESET}
          size={"sm"}
          radious="cl"
          onClick={() => onCloseTimer()}
        />
      </div>
    </>
  );
};

TimerActionButtons.propTypes = {
  onPauseTimer: PropTypes.func,
  onSkipRound: PropTypes.func,
  onCloseTimer: PropTypes.func,
  onFastForward: PropTypes.func,
};

TimerActionButtons.defaultProps = {
  onPauseTimer: ()=>{},
  onSkipRound: ()=>{},
  onCloseTimer: ()=>{},
  onFastForward: ()=>{},
};

export default TimerActionButtons;
