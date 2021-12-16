import React from "react";
import PropTypes from "prop-types";
import "./ActionButton.css";

const ActionButton = ({theme, onClick, name}) => {
  return <button className={theme} onClick={onClick}>{name}</button>;
}

ActionButton.propTypes = {
  theme: PropTypes.string,
  onClick: PropTypes.func,
  name: PropTypes.string,
};

ActionButton.defaultProps = {
  theme: "default-action-button",
  onClick: ()=>{},
  name: "Untitled",
};

export default ActionButton;