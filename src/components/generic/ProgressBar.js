import React from "react";
import PropTypes from "prop-types";
import "./ProgressBar.css";

const ProgressBar = ({ progress, size, className, children }) => {
  return (
    <div
      className={[
        `size-${size}`,
        "ProgressBar",
        className,
      ].join(" ")}
    >
      <div className={["overlay", "progress-" + progress].join(" ")}>
        <div className={["InnerWraper"].join(" ")}>{children}</div>
      </div>
    </div>
  );
};

ProgressBar.propTypes = {
  progress: PropTypes.number,
  className: PropTypes.string,
  size: PropTypes.oneOf(["xs", "sm", "md", "lg", "xl", "xxl"]),
};

ProgressBar.defaultProps = {
  progress: 0,
  className: null,
 size: "lg",
};

export default ProgressBar;
