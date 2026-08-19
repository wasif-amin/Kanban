import React, { useState } from "react";
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
    const { id } = event.target;
    setStatus(id);

    props.onStatusChange(props.id, id);
  }

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
          id="completed"
          type="checkbox"
          checked={status === "completed"}
          onChange={handleChecked}
        />
        <label htmlFor="completed">Completed</label>

        <input
          id="urgent"
          type="checkbox"
          checked={status === "urgent"}
          onChange={handleChecked}
        />
        <label htmlFor="urgent">Needs Attention</label>

        <input
          id="inProgress"
          type="checkbox"
          checked={status === "inProgress"}
          onChange={handleChecked}
        />
        <label htmlFor="inProgress">In-Progress</label>

        <input
          id="notStarted"
          type="checkbox"
          checked={status === "notStarted"}
          onChange={handleChecked}
        />
        <label htmlFor="notStarted">Not Started</label>
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
