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
  const [status, setStatus] = useState("notStarted");
  function handleChecked(event) {
    const { id } = event.target;
    setStatus(id);
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
          id="go-ahead"
          type="checkbox"
          checked={status === "go-ahead"}
          onChange={handleChecked}
        />

        <label name="go-ahead">Completed</label>

        <input
          id="urgent"
          type="checkbox"
          checked={status === "urgent"}
          onChange={handleChecked}
        />
        <label name="urgent">Needs Attention</label>
        <input
          id="notStarted"
          type="checkbox"
          checked={status === "notStarted"}
          onChange={handleChecked}
        />
        <label name="go-ahead">not started</label>
        <label name="inProgress"> In Progress</label>

        <input
          id="inProgress"
          type="checkbox"
          checked={status === "inProgress"}
          onChange={handleChecked}
        />
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
    </div>
  );
}

export default Project;
