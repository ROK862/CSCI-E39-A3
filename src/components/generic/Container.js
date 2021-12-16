import React from "react";
import PropTypes from "prop-types";
import "./Container.css";

const Container = ({ progress, size, className, children, height }) => {
  return (
    <div
      className={[`size-${size}`, "generic-container", className].join(" ")}
      style={{ minHeight: height }}
    >
      <div className={["overlay", "progress-" + progress].join(" ")}>
        <div className={["InnerWraper"].join(" ")}>{children}</div>
      </div>
    </div>
  );
};

Container.propTypes = {
  progress: PropTypes.number,
  className: PropTypes.string,
  height: PropTypes.number,
  size: PropTypes.oneOf(["xs", "sm", "md", "lg", "xl", "xxl"]),
};

Container.defaultProps = {
  progress: 0,
  className: null,
  size: "lg",
  height: 300,
};

export default Container;
