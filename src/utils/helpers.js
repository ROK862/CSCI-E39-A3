// Add helpers here. This is usually code that is just JS and not React code. Example: write a function that
// calculates number of minutes when passed in seconds. Things of this nature that you don't want to copy/paste
// import { Helpers } from "react-scroll";

import { APP_RENDER_KEYS } from "../context/settings";

// _________________________________________________________________ //
// These changes are to comply with the course requirements.
// - Change all ES5 code to ES6.

// Create a module i will be using as a handle. Sys seem's short and sexy.

// Convert time to seconds. Single liner. Hmm. I'm learning.
export const _timeToSeconds = ({ hours, minutes, seconds }) =>
  parseInt(hours * 60 * 60) + parseInt(minutes * 60) + parseInt(seconds);

// Convert to time string. If we reveive an input, which is already in seconds, there should be no need to do additional calculations.
export const _timeToDisplay = ({ input, hours, minutes, seconds }) => {
  let dateTime = new Date(null);
  dateTime.setSeconds(input || _timeToSeconds({ hours, minutes, seconds })); // specify value of SECONDS
  let timeVal = "";
  try {
    timeVal = dateTime.toISOString().substr(11, 8);
  } catch (ex) {
    timeVal = "00:00:00";
  }
  return timeVal;
};

export const _queueToTotalDuration = ({ queue }) => {
  let ms = {h:0,m:0,s:0};
  queue.forEach(e => {
    if (e.currentTimer === APP_RENDER_KEYS.COUNTDOWN || e.currentTimer === APP_RENDER_KEYS.STOPWATCH) {
      ms.h += e.hours;
      ms.m += e.minutes;
      ms.s += e.seconds;
    } else if (e.currentTimer === APP_RENDER_KEYS.XY || e.currentTimer === APP_RENDER_KEYS.TABATA) {
      ms.h += e.hours * e.rounds;
      ms.m += e.minutes * e.rounds;
      ms.s += e.seconds * e.rounds;
      // Maybe we should add resting time as-well.
      ms.h += e.breakHours * e.rounds;
      ms.m += e.breakMinutes * e.rounds;
      ms.s += e.breakSeconds * e.rounds;
    }

  });

  return _timeToDisplay({hours:ms.h, minutes:ms.m, seconds:ms.s});
};

// Helper Methods