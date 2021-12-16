import Stopwatch from "../components/timers/Stopwatch";
import Countdown from "../components/timers/Countdown";
import Tabata from "../components/timers/Tabata";
import XY from "../components/timers/XY";
import {
  AiOutlineSetting,
  AiOutlineFieldTime,
  AiOutlineRollback,
  AiOutlineDelete,
  AiOutlinePlayCircle,
  AiOutlineStepForward,
  AiOutlineRetweet,
  AiFillFastForward,
  AiOutlinePauseCircle,
  AiOutlineSave
} from "react-icons/ai";

// Server which houses application files.
const server =
  "https://raw.githubusercontent.com/prof-tejera/assignment-3-ROK862/";

// Application render keys for each render state.
export const APP_RENDER_KEYS = {
  MENU: "MENU",
  TABATA: "TABATA",
  COUNTDOWN: "COUNTDOWN",
  STOPWATCH: "STOPWATCH",
  XY: "XY",
};

// Application icons values. Quick way to manage icons used through out the
// application.
export const APP_ICONS = {
  DELETE: <AiOutlineDelete style={{ color: "red", fontSize: 15 }} />,
  SETTINGS: <AiOutlineSetting />,
  START_TIMER: <AiOutlineFieldTime />,
  BACK: <AiOutlineRollback />,
  PLAY: <AiOutlinePlayCircle />,
  RESUME: <AiOutlineStepForward />,
  PAUSE: <AiOutlinePauseCircle />,
  RESET: <AiOutlineRetweet />,
  FAST_FORWARD: <AiFillFastForward />,
  QUEUE: <AiOutlineSave />,
};
// Reference to application icon keys.
export const APP_ICON_KEYS = {
  DELETE: "DELETE",
  SETTINGS: "SETTINGS",
  START_TIMER: "START_TIMER",
  BACK: "BACK",
};

// Application audio files and other settings comes here.
export const APP_AUDIO = {
  VOLUME: 0.05,
  CLIPS: {
    ON_START_TIMER: `${server}main/src/audio/TimerStartVolume01.mp3`,
    ON_CLICK: `${server}main/src/audio/goalVolume02.mp3`,
    ON_PAUSE: `${server}main/src/audio/TimerPauseVolume01.mp3`,
    ON_TIMING: `${server}main/src/audio/TimerTimingVolume01.mp3`,
    ON_STOP_TIMER: `${server}main/src/audio/TimerPauseVolume01.mp3`,
    DEFAULT: `${server}main/src/audio/goalVolume01.mp3`,
    ON_REACHED_GOAL: `${server}main/src/audio/goalVolume02.mp3`,
    ON_COMPLETE_ROUND: `${server}main/src/audio/goalVolume03.mp3`,
    ON_REMOVE_ITEM: `${server}main/src/audio/TimerPauseVolume01.mp3`,
  },
};

// Keys to each audio clip.
export const APP_AUDIO_CLIP_KEYS = {
  ON_START_TIMER: "ON_START_TIMER",
  ON_CLICK: "ON_CLICK",
  ON_PAUSE: "ON_PAUSE",
  ON_TIMING: "ON_TIMING",
  DEFAULT: "DEFAULT",
  ON_STOP_TIMER: "ON_STOP_TIMER",
  ON_REACHED_GOAL: "ON_REACHED_GOAL",
  ON_COMPLETE_ROUND: "ON_COMPLETE_ROUND",
  ON_REMOVE_ITEM: "ON_REMOVE_ITEM",
};

// Application app flow keys comes here.
export const APP_FLOW_KEYS = {
  WORKOUT: "Workout Timer",
  REST: "Rest Timer",
};

// Application UI keys comes here.
export const APP_UI_KEYS = {
  FLOW: "FLOW",
  SETTINGS: "SETTINGS",
};

// This feature has been replaced with workflowState
// in AppContext provider.
let TIMER_REF = {
  RENDER_STATE: "COUNTDOWN",
};

// Application timers with associated text and render objects.
export const APP_TIMERS = [
  {
    title: "Time your training with a stop watch.",
    subTitle:
      "Let's get you started with a normal timed session. Time your workout and get feedback from the app in realtime.",
    C: <Stopwatch />,
    S: APP_RENDER_KEYS.STOPWATCH,
  },
  {
    title: "Set a timed goal, and track your progress.",
    subTitle:
      "Be proactive! Let's prepare your training session by setting timed goals.",
    C: <Countdown recId={1} />,
    S: APP_RENDER_KEYS.COUNTDOWN,
  },
  {
    title: "Goal driven session, with rounds.",
    subTitle:
      "Awesome, now let's take this a step further. Set timed goals with multiple rounds.",
    C: <XY />,
    S: APP_RENDER_KEYS.XY,
  },
  {
    title: "Now, we need to pace your training.",
    subTitle:
      "Take a training session with breaks across measurable intervals.",
    C: <Tabata />,
    S: APP_RENDER_KEYS.TABATA,
  },
];

// depricated module, please ignore for now.
// Code has been moved to AppProvider and is now handled with context.
export const _shouldRender = ({ state }) => {
  return false;
};

// This action is no longer relevent. Replaced with workflowState in AppContext provider.
export const setTimerToDisplay = ({ timer }) => {
  TIMER_REF.RENDER_STATE = APP_RENDER_KEYS[timer] || APP_RENDER_KEYS.COUNTDOWN;
};
