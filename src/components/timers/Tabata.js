import React, { useContext } from "react";
import { AppContext } from "../../context/AppProvider";
import RenderState from "./RenderState";

const Tabata = () => {

  // Import context getters and setters from the Store,
  // This will work similar to useState. However, all objects are passed down
  // by reference, to the timer component.
  const { currentTimer } = useContext(AppContext);

  // Manage what the user see's at any given state.
  // Useful way to reduce complexity associated with interfaces is to reduce actions
  // into managable steps.

  // Notice, each stage renders an independent component in itself, and passes setters down
  // to allow for easy update of state values.

  // Needed to simplify my approuch by breaking down my code into reusable componets.
  // Default state displays [nothing to tender.]

  // I simplified the render state function to reduce the amound of data that is passed back
  // and forth between children and parent component.

  // This is the actual render. Lets just return the title, and call on the
  // renderState method to give us an appropriate render based on the current state.
  return (
    <div className={"Default-Pink-Theme"}>
      <div className="Component-Title">{currentTimer}</div>
      <RenderState />
    </div>
  );
};

export default Tabata;
