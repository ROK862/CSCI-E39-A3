import "./Options.css";

// TODO: Convert to functional component. [DONE]
const Options = (props) => {
  return (
    <div className="option-input-wrapper">
      <label>{props.name}</label>
      <select
        onChange={(e) => {
          props.onChange(e.target.value);
        }}
        className={props.className || "default-selected-element"}
        value={props.current || 0}
      >
        {(props.options || ["Nothing found"]).map((e, i) => {
          return (
            <option key={i} value={e}>
              {e}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default Options;
