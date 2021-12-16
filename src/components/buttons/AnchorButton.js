import React from "react";
import { APP_ICONS } from "../../context/settings"; 
import PropTypes from "prop-types";
import "./AnchorButton.css";
import { Link } from "react-router-dom";

const AnchorButton = ({to, className, onClick, theme, iconRef, name, size, radious, icon}) => {
  const IconRef = APP_ICONS[iconRef];
  return <Link to={to}><button onClick={onClick} className={`default-anchor-button ${className} ${theme} btn-size-${size} border-radious-${radious}`}>{IconRef || ""}{icon || name}</button></Link>;
}

AnchorButton.propTypes = {
  to: PropTypes.string,
  radious: PropTypes.oneOf(["nm", "cl"]),
  size: PropTypes.oneOf(["xs", "sm", "md", "lg", "xl", "xxl"]),
  className: PropTypes.string,
  theme: PropTypes.string,
  onClick: PropTypes.func,
  name: PropTypes.string,
  icon: PropTypes.object,
  iconRef: PropTypes.string,
};

AnchorButton.defaultProps = {
  to: "#",
  radious: "nm",
  size: "lg",
  className: "",
  theme: "",
  onClick: ()=>{},
  name: "",
  iconRef: "",
};

export default AnchorButton;
