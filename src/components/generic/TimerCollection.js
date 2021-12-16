import React, { useContext } from "react";
import PropTypes from "prop-types";
import { AppContext } from "../../context/AppProvider";
import TimerToolBar from "../../components/generic/TimerToolBar";
import TimerSubtitle from "../../components/generic/TimerSubtitle";
import TimerTitle from "../../components/generic/TimerTitle";
import { APP_TIMERS } from "../../context/settings";

const TimerCollection = ( {subTitle} ) => {
  const { status, _shouldRender } = useContext(AppContext);

  return (
    <>
      {APP_TIMERS.map((timer, i) =>
        _shouldRender({ state: timer.S }) ? (
          <div key={`timer-${i}`}>
            {(status !== "timing") && <TimerToolBar />}
            <TimerTitle key={`title-${i}`}>{timer.title}</TimerTitle>
            <TimerSubtitle key={`sub-title-${i}`}>
              {timer.subTitle}
            </TimerSubtitle>
            {subTitle}
            {timer.C}
          </div>
        ) : (
          <div key={`empty-${i}`}></div>
        )
      )}
    </>
  );
}

TimerCollection.propTypes = {
  subTitle: PropTypes.string,
};

TimerCollection.defaultProps = {
  subTitle: "",
};

export default TimerCollection;