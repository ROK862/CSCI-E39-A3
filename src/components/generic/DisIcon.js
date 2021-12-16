import React from "react";
import PropTypes from "prop-types";
import "./DisIcon.css";

const DisIcon = ({ icon, size }) => {
  return <div className={`gen-icon-wrapper-${size}`}>{icon}</div>;
}

DisIcon.propTypes = {
  icon: PropTypes.object,
  size: PropTypes.oneOf(["xs", "sm", "md", "lg", "xl", "xxl"]),
};

DisIcon.defaultProps = {
  icon: null,
  size: "xs",
};

export default DisIcon;
