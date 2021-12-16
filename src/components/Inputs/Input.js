import React from "react";
import PropTypes from "prop-types";
import "./Input.css";

const Input = ({ onChange, className, placeholder, label, value }) => {
  return (
    <>
      <div className="1x-label-wrapper">
        <div className="1x-label-wrapper">
          <label>{label}</label>
        </div>
        <div className="1x-label-wrapper">
          <input
            onChange={(e) => {
              onChange(e.target.value);
            }}
            className={className}
            placeholder={placeholder}
            value={value}
          />
        </div>
      </div>
    </>
  );
};

Input.propTypes = {
  className: PropTypes.string,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  label: PropTypes.string,
};

Input.defaultProps = {
  className: "default-gen-input",
  placeholder: "",
  value: "",
  label: "",
};

export default Input;
