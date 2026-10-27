import React, { useState, useEffect } from "react";
import { KanbanCard, CardStatus } from "../types";
const topStyles: React.CSSProperties = {
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
interface ProjectProps {
  onDelete(id: number): void;
  onActionUpdate(e: React.FocusEvent<HTMLInputElement, Element>, id: number): unknown;
  onOwnerUpdate(
    e: React.FocusEvent<HTMLInputElement, Element>,
    id: number
  ): unknown;
  owner: string | number | readonly string[] | undefined;
  status?: CardStatus;
}
interface ProjectProps {
  card: KanbanCard;
  onStatusChange: (id: number, nextStatus: CardStatus) => void;
}
function Project(props: ProjectProps) {
  const [isEditingAction, setIsEditingAction] = useState(false);
  const [isEditingOwner, setIsEditingOwner] = useState(false);
  const [status, setStatus] = useState<CardStatus>(
    props.status || "not started"
  );
  function handleChecked(event: React.ChangeEvent<HTMLInputElement>) {
    const rawId = event.target.id;
    const statusId = rawId.split("-")[0] as CardStatus;

    setStatus(statusId);
    props.onStatusChange(props.card.id, statusId);
  }
  useEffect(() => {
    setStatus(props.status || "not started");
  }, [props.status]);

  return (
    <div className={`card ${status}`}>
      <div className="top" style={topStyles}>
        <h1> {props.card.ProjectTitle}</h1>
        {isEditingOwner ? (
          <input
            defaultValue={props.owner}
            autoFocus
            onBlur={(e) => {
              props.onOwnerUpdate(e, props.card.id);
              setIsEditingOwner(false);
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                (e.target as HTMLInputElement).blur;
              }
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
          id={`completed-${props.card.id}`}
          type="checkbox"
          checked={status === "completed"}
          onChange={handleChecked}
        />
        <label htmlFor={`completed-${props.card.id}`}>Completed</label>

        <input
          id={`urgent-${props.card.id}`}
          type="checkbox"
          checked={status === "urgent"}
          onChange={handleChecked}
        />
        <label htmlFor={`urgent-${props.card.id}`}>Needs Attention</label>

        <input
          id={`inProgress-${props.card.id}`}
          type="checkbox"
          checked={status === "in progress"}
          onChange={handleChecked}
        />
        <label htmlFor={`inProgress-${props.card.id}`}>In-Progress</label>

        <input
          id={`notStarted-${props.card.id}`}
          type="checkbox"
          checked={status === "not started"}
          onChange={handleChecked}
        />
        <label htmlFor={`notStarted-${props.card.id}`}>Not Started</label>
      </div>
      <h3>current action item:</h3>
      
      {isEditingAction ? (
        <input
          defaultValue={props.card.actionItem}
          onBlur={(e: React.FocusEvent<HTMLInputElement>) => {
           
            props.onActionUpdate(e, props.card.id);
            setIsEditingAction(false);
          }}
          onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
            
            if (e.key === "Enter") {
              (e.target as HTMLInputElement).blur();
            }
          }}
        />
      ) : (
        <p onClick={() => setIsEditingAction(true)}>{props.card.actionItem}</p>
      )}
      <button onClick={() => props.onDelete(props.card.id)}>Delete Project</button>
    </div>
  );
}

export default Project;
