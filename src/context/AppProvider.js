import React, { useState, useEffect } from "react";
import { _timeToSeconds, _timeToDisplay } from "../utils/helpers";
import { playAudio } from "../audio/SoundEffect";
import {
  APP_RENDER_KEYS,
  APP_FLOW_KEYS,
  APP_UI_KEYS,
  setTimerToDisplay,
  APP_AUDIO_CLIP_KEYS,
} from "./settings";

// Presets for the AppContext.
// This list will grow exponentially as the application grows.
// Still thinking of ways to manage this better.

export const AppContext = React.createContext({
  status: "inactive",
  setTimerStatus: (val) => {},
  hours: 0,
  setHours: (val) => {},
  minutes: 0,
  setMinutes: (val) => {},
  seconds: 0,
  setSeconds: (val) => {},
  breakHours: 0,
  setBreakHours: (val) => {},
  breakMinutes: 0,
  setBreakMinutes: (val) => {},
  breakSeconds: 0,
  setBreakSeconds: (val) => {},
  workoutStatus: "",
  setWorkoutStatus: (val) => {},
  formattedTime: "",
  currentTime: "",
  setCurrentTime: (val) => {},
  onInitializeTimerQueue: (val) => {},
  onAddTimer: (val) => {},
  onStopTimer: (val) => {},
  timerQueue: [],
  workflowState: "Workout",
  currentTimer: null,
  _setCurrentTimer: (val) => {},
  _shouldRender: (val) => {},
  rounds: 0,
  setRounds: (val) => {},
  onSkipRound: (val) => {},
  interfaceState: null,
  setInterfaceState: () => {},
  formattedBreakTime: "",
  _removeFromQueue: () => {},
  setTimer: () => {},
  onFastForward: () => {},
});

// I decided to move all the effects up one level to the global context.
// That is, all effects will be handled with context. DRY. [ :) ]
const AppProvider = ({ children }) => {
  const [status, setTimerStatus] = useState("active");
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(2);
  const [seconds, setSeconds] = useState(30);
  const [rounds, setRounds] = useState(5);
  const [breakHours, setBreakHours] = useState(0);
  const [breakMinutes, setBreakMinutes] = useState(1);
  const [breakSeconds, setBreakSeconds] = useState(30);
  const [workoutStatus, setWorkoutStatus] = useState("Workout");
  const [formattedTime, setformattedTime] = useState("");
  const [formattedBreakTime, setformattedBreakTime] = useState("");
  const [currentTime, setCurrentTime] = useState("");
  const [workflowState, setWorkflowState] = useState(APP_FLOW_KEYS.WORKOUT);
  const [currentTimer, setTimer] = useState(APP_RENDER_KEYS.COUNTDOWN);
  const [interfaceState, setInterfaceState] = useState(APP_UI_KEYS.FLOW);
  const [timerQueue, setTimerQueue] = useState([]);
  const [queueIndex, setQueueIndex] = useState(0);

  /**###################################################################################
   * In context helper methods.
   * ###################################################################################
   * Reservered for all my helper methods.
   */

  const _activateNextTimer = ({ timer }) => {
    setTimer(timer.currentTimer);
    setWorkflowState(APP_FLOW_KEYS.WORKOUT);

    const timout = setTimeout(() => {
      setHours(timer.hours);
      setMinutes(timer.minutes);
      setSeconds(timer.seconds);
      setRounds(timer.rounds);
      setBreakHours(timer.breakHours);
      setBreakMinutes(timer.breakMinutes);
      setBreakSeconds(timer.breakSeconds);
      _setInitialTimeSettings();
      setQueueIndex(timerQueue.length > queueIndex ? queueIndex + 1 : 0);
      setTimerStatus("timing");
    }, 500);

    return () => {
      clearTimeout(timout);
    };
  };

  const _validateTimerInputs = (tis, btis, vebros = true) => {
    if (tis === 0) {
      if (vebros)
        alert("Please make sure you set the time limits before continuing.");
      return false;
    } else if (currentTimer === APP_RENDER_KEYS.XY && btis === 0) {
      if (vebros)
        alert("Please make sure you specify break duration before continuing.");
      return false;
    } else if (
      (currentTimer === APP_RENDER_KEYS.XY ||
        currentTimer === APP_RENDER_KEYS.TABATA) &&
      rounds === 0
    ) {
      if (vebros)
        alert(
          "Please make sure you set timer rounds limits before continuing."
        );
      return false;
    }
    return true;
  };

  const _setInitialTimeSettings = () => {
    let timer = timerQueue[queueIndex];
    // Time in seconds for main timer
    const tis = _timeToSeconds({
      hours: timer.hours,
      minutes: timer.minutes,
      seconds: timer.seconds,
    });
    // Time in seconds for break timer.
    const btis = _timeToSeconds({
      hours: timer.breakHours,
      minutes: timer.breakMinutes,
      seconds: timer.breakSeconds,
    });

    // Validation of inputs for all components.
    if (!_validateTimerInputs(tis, btis, false)) return false;

    let timeInSeconds = 0;
    if (timer.currentTimer === APP_RENDER_KEYS.COUNTDOWN) {
      timeInSeconds = tis;
    }

    let newTime = 0;
    if (timer.currentTimer === APP_RENDER_KEYS.COUNTDOWN) {
      newTime = tis;
    }
    const fTime = _timeToDisplay({ input: newTime });
    // Set state values for formated time, and new current time.
    setformattedTime(fTime);
    setCurrentTime(newTime);
    setCurrentTime(timeInSeconds);
    setformattedTime(_timeToDisplay({ input: timeInSeconds }));
    setformattedBreakTime(_timeToDisplay({ input: btis }));

    return true;
  };

  const _removeFromQueue = (id) => {
    let temp = [];
    timerQueue.forEach((e, i) => {
      if (id !== i) {
        temp.push(e);
      }
    });
    setTimerQueue(temp);
    playAudio({ clip: APP_AUDIO_CLIP_KEYS.ON_REMOVE_ITEM });
  };

  const _setCurrentTimer = (e) => {
    setTimer(e);
    setTimerStatus("active");
  };

  const _shouldRender = ({ state }) => currentTimer === state;

  /**###################################################################################
   * Events come here.
   * ###################################################################################
   * Reservered for all my events.
   */

  const onFastForward = () => {
    onReachedGoal();
  }
  // Handle Stop Timer button onclick here.
  const onStopTimer = () => {
    const fTime = _timeToDisplay({
      hours,
      minutes,
      seconds,
    });
    const fdTime = _timeToDisplay({
      hours: breakHours,
      minutes: breakMinutes,
      seconds: breakSeconds,
    });
    setTimerStatus("inactive");
    setformattedTime(fTime);
    setformattedBreakTime(fdTime);
    setCurrentTime(0);
    playAudio({ clip: APP_AUDIO_CLIP_KEYS.ON_STOP_TIMER });
  };

  // Handle start timing button onclick here.
  const onInitializeTimerQueue = () => {
    if (timerQueue.length === 0) {
      alert("Please add items to the workout queue first!");
      return;
    }
    _activateNextTimer({
      timer:
        queueIndex >= timerQueue.length
          ? timerQueue[0]
          : timerQueue[queueIndex],
    });

    if (_setInitialTimeSettings()) {
      playAudio({ clip: APP_AUDIO_CLIP_KEYS.ON_TIMING });
    }
  };

  const onAddTimer = ({ name }) => {
    if (name.length === 0) {
      alert("Timer name can't be left blank!");
      return;
    }

    // Append current this configurations to the timerQueue.
    setTimerQueue([
      ...timerQueue,
      {
        name: name,
        status: status,
        hours: hours,
        minutes: minutes,
        seconds: seconds,
        rounds: rounds,
        breakHours: breakHours,
        breakMinutes: breakMinutes,
        breakSeconds: breakSeconds,
        workoutStatus: workoutStatus,
        formattedTime: formattedTime,
        currentTime: currentTime,
        workflowState: workflowState,
        currentTimer: currentTimer,
        interfaceState: interfaceState,
      },
    ]);
  };

  // Any action on reach goal comes here, that is, once the timer reaches
  // it's target value, negative or positive.
  const onReachedGoal = () => {
    if (queueIndex < timerQueue.length) {
      _activateNextTimer({ timer: timerQueue[queueIndex] });
    } else {
      setQueueIndex(0);
      setTimerStatus("complete");
    }
    playAudio({ clip: APP_AUDIO_CLIP_KEYS.ON_REACHED_GOAL });
  };

  // Any action on round complete comes here before next render.
  const onCompleteRound = () => {
    playAudio({ clip: APP_AUDIO_CLIP_KEYS.ON_COMPLETE_ROUND });
  };

  const onSkipRound = () => {
    if (
      (currentTimer !== APP_RENDER_KEYS.TABATA &&
        currentTimer !== APP_RENDER_KEYS.XY) ||
      rounds <= 0
    )
      return;

    const fdTime = _timeToDisplay({
      hours: breakHours,
      minutes: breakMinutes,
      seconds: breakSeconds,
    });
    setRounds(rounds - 1);
    setWorkflowState(APP_FLOW_KEYS.WORKOUT);
    onCompleteRound();
    setformattedBreakTime(fdTime);
    setformattedTime(formattedTime);
    setCurrentTime(0);
  };

  /**###################################################################################
   * HOOKS COME HERE
   * ###################################################################################
   * Reservered for all my hooks.
   */

  useEffect(() => {
    const fTime = _timeToDisplay({
      hours,
      minutes,
      seconds,
    });
    const fdTime = _timeToDisplay({
      hours: breakHours,
      minutes: breakMinutes,
      seconds: breakSeconds,
    });
    setformattedTime(fTime);
    setformattedBreakTime(fdTime);
  }, [hours, minutes, seconds, breakHours, breakMinutes, breakSeconds]);
  
  /* CHANGE IMPLEMENTED */
  /*---------------------------------------------------------------------------------------------*/
  // TO-WIT: Changed access to currentTimer. This is now handle with context.
  // That is, all components access this value from AppContext Provider, instead of const globals.
  // Notice, the value is still kept in a global const. However, a copy of it is accessable with context.
  useEffect(() => {
    setTimerToDisplay(currentTimer);
  }, [currentTimer]);

  // This hook handles the tick function, and cleanup of interval before next render.
  useEffect(() => {
    // Check if we are allowed to start the tick function.
    // Prevent subscription from executing every time.
    if (status !== "timing") return;

    const timeout = setTimeout(() => {
      // Should we increment or decrement the count?
      let newTime =
        currentTimer === APP_RENDER_KEYS.COUNTDOWN
          ? currentTime - 1
          : currentTime + 1;

      // Test and return the right timer based on the APP_RENDER_KEYS and APP_FLOW_KEYS.
      // Notice, target time changes based on currentTimer and workflowState.
      // Also, it's relatively clean to manage everything here.
      const target =
        currentTimer === APP_RENDER_KEYS.XY
          ? workflowState === APP_FLOW_KEYS.REST
            ? _timeToSeconds({
                hours: breakHours,
                minutes: breakMinutes,
                seconds: breakSeconds,
              })
            : _timeToSeconds({ hours, minutes, seconds })
          : _timeToSeconds({ hours, minutes, seconds });

      // Test if the timer has reached it's goal.
      if (newTime < 0 && currentTimer === APP_RENDER_KEYS.COUNTDOWN) {
        onReachedGoal();
        return;
      } else if (
        newTime >= target &&
        currentTimer === APP_RENDER_KEYS.STOPWATCH
      ) {
        onReachedGoal();
        return;
      } else if (newTime >= target && currentTimer === APP_RENDER_KEYS.TABATA) {
        if (workflowState === APP_FLOW_KEYS.WORKOUT) {
          setWorkflowState(APP_FLOW_KEYS.REST);
          newTime = 0;
        } else if (rounds > 1) {
          setRounds(rounds - 1);
          newTime = 0;
          setWorkflowState(APP_FLOW_KEYS.WORKOUT);
          onCompleteRound();
        } else {
          setWorkflowState(APP_FLOW_KEYS.WORKOUT);
          onReachedGoal();
          return;
        }
      } else if (newTime >= target && currentTimer === APP_RENDER_KEYS.XY) {
        if (rounds > 1) {
          setRounds(rounds - 1);
          newTime = 0;
          onCompleteRound();
        } else {
          onReachedGoal();
          return;
        }
      }

      // Set the display time, which is to be use for display in the digital watch display.
      const fTime = _timeToDisplay({ input: newTime });
      const fdTime = _timeToDisplay({
        hours: breakHours,
        minutes: breakMinutes,
        seconds: breakSeconds,
      });
      // Set state values for formated time, and new current time.
      setformattedTime(fTime);
      setformattedBreakTime(fdTime);
      setCurrentTime(newTime);
    }, 1000);

    return () => {
      // Lets clean up the timeout object to avoid memory leaking.
      clearTimeout(timeout);
    };
    // Monitor both the current time and status to alsp
    // allow trigger once the status changes back to timing.

    // At this point, I'm only adding additional dependencies to avoid useEffect dependency hell.
    // Will need to review this part of the code.
    // I do controll executions of this subscription though, on top level. So, this should only run when
    // the workflow state is timing.
  });

  // Pass getters and setters down to child components.
  return (
    <AppContext.Provider
      value={{
        status,
        setTimerStatus,
        hours,
        setHours,
        minutes,
        setMinutes,
        seconds,
        setSeconds,
        breakHours,
        setBreakHours,
        breakMinutes,
        setBreakMinutes,
        breakSeconds,
        setBreakSeconds,
        workoutStatus,
        setWorkoutStatus,
        formattedTime,
        currentTime,
        setCurrentTime,
        onInitializeTimerQueue,
        onAddTimer,
        timerQueue,
        onStopTimer,
        workflowState,
        currentTimer,
        _setCurrentTimer,
        _shouldRender,
        rounds,
        setRounds,
        onSkipRound,
        interfaceState,
        setInterfaceState,
        formattedBreakTime,
        _removeFromQueue,
        setTimer,
        onFastForward
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;
