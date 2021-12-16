import React from "react";
import { APP_ICONS } from "../../context/settings";
import AnchorButton from "../../components/buttons/AnchorButton";
import "./QueueItem.css"

const QueueItem = ({ name, onDelete }) => {
  return (
    <>
      <div className="list-2x2-wrapper">
        <div className="list-2x2-item-xl">
            <pre>{name}</pre>
        </div>
        <div className="list-2x2-item-xs">
          <AnchorButton radious="cl" icon={APP_ICONS.DELETE} onClick={onDelete} />
        </div>
      </div>
    </>
  );
};


export default QueueItem;