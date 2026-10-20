import React, { useState, useEffect } from "react";
const topStyles = {
  borderRadius: "25px 25px 25px 26px",
  width: "100%",
  backgroundColor: "#00cec9",
  minHeight: "80px",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  position: "relative",
  zIndex: 10,
};
function Project(props) {
  const [isEditingAction, setIsEditingAction] = useState(false);
  const [isEditingOwner, setIsEditingOwner] = useState(false);
  const [status, setStatus] = useState(props.status || "notStarted");
  function handleChecked(event) {
    const rawId = event.target.id;
    const statusId = rawId.split("-")[0];

    setStatus(statusId);
    props.onStatusChange(props.id, statusId);
  }
  useEffect(() => {
    setStatus(props.status || "notStarted");
  }, [props.status]);

  return (
    <div className={`card ${status}`}>
      <div className="top" style={topStyles}>
        <h1> {props.ProjectTitle}</h1>
        {isEditingOwner ? (
          <input
            defaultValue={props.owner}
            autoFocus
            onBlur={(e) => {
              props.onOwnerUpdate(e, props.id);
              setIsEditingOwner(false);
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") e.target.blur();
            }}
          />
        ) : (
          <p
            onClick={() => setIsEditingOwner(true)}
            style={{ cursor: "pointer" }}
          >
            with: {props.owner}
          </p>
        )}
      </div>
      <div>
        <input
          id={`completed-${props.id}`}
          type="checkbox"
          checked={status === "completed"}
          onChange={handleChecked}
        />
        <label htmlFor={`completed-${props.id}`}>Completed</label>

        <input
          id={`urgent-${props.id}`}
          type="checkbox"
          checked={status === "urgent"}
          onChange={handleChecked}
        />
        <label htmlFor={`urgent-${props.id}`}>Needs Attention</label>

        <input
          id={`inProgress-${props.id}`}
          type="checkbox"
          checked={status === "inProgress"}
          onChange={handleChecked}
        />
        <label htmlFor={`inProgress-${props.id}`}>In-Progress</label>

        <input
          id={`notStarted-${props.id}`}
          type="checkbox"
          checked={status === "notStarted"}
          onChange={handleChecked}
        />
        <label htmlFor={`notStarted-${props.id}`}>Not Started</label>
      </div>
      <h3>current action item:</h3>
      {/* <p>{props.actionItem}</p> */}
      {isEditingAction ? (
        <input
          defaultValue={props.actionItem}
          onBlur={(e) => {
            props.onActionUpdate(e, props.id);
            setIsEditingAction(false);
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") e.target.blur();
          }}
        />
      ) : (
        <p onClick={() => setIsEditingAction(true)}>{props.actionItem}</p>
      )}
      <button onClick={() => props.onDelete(props.id)}>Delete Project</button>
    </div>
  );
}

export default Project;
