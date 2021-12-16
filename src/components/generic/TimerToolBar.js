import React, { useContext } from "react";
import { AppContext } from "../../context/AppProvider";
import AnchorButton from "../buttons/AnchorButton";
import { APP_RENDER_KEYS } from "../../context/settings";

const TimerToolBar = () => {
    const { _setCurrentTimer, status, currentTimer } = useContext(AppContext);
    const accessToggle = (status === "timing") ? "inactive" : "active";

    return (
        <div className={`timer-list ${accessToggle}`}>
            <AnchorButton
            className={currentTimer===APP_RENDER_KEYS.COUNTDOWN ? "Selected" : ""}
            name={APP_RENDER_KEYS.COUNTDOWN}
            onClick={() => _setCurrentTimer(APP_RENDER_KEYS.COUNTDOWN)}
            />
            <AnchorButton
            className={currentTimer===APP_RENDER_KEYS.STOPWATCH ? "Selected" : ""}
            name={APP_RENDER_KEYS.STOPWATCH}
            onClick={() => _setCurrentTimer(APP_RENDER_KEYS.STOPWATCH)}
            />
            <AnchorButton
            className={currentTimer===APP_RENDER_KEYS.XY ? "Selected" : ""}
            name={APP_RENDER_KEYS.XY}
            onClick={() => _setCurrentTimer(APP_RENDER_KEYS.XY)}
            />
            <AnchorButton
            className={currentTimer===APP_RENDER_KEYS.TABATA ? "Selected" : ""}
            name={APP_RENDER_KEYS.TABATA}
            onClick={() => _setCurrentTimer(APP_RENDER_KEYS.TABATA)}
            />
        </div>
    )
}

export default TimerToolBar;