import React, { ChangeEventHandler, useState } from "react";
import { KanbanCard, CardStatus } from "../types";

interface CreateProjectProps {
  project: { projectTitle: string; owner: string; actionItem: string };
  onChange: ChangeEventHandler<HTMLInputElement> | undefined;
  onAddProject: (
    title: string,
    owner: string,
    action: string,
    status: CardStatus
  ) => void;
}

function CreateProject(props: CreateProjectProps) {
  const [title, setTitle] = useState("");
  const [owner, setOwner] = useState("");
  const [actionItem, setActionItem] = useState("");

  const [status, setStatus] = useState<CardStatus>("not started");
  return (
    <form className="create">
      <input
        onChange={props.onChange}
        name="projectTitle"
        value={props.project.projectTitle}
        placeholder="ProjectTitle"
      />
      <input
        onChange={props.onChange}
        name="owner"
        placeholder="owner"
        value={props.project.owner}
      />
      <textarea
        onChange={props.onChange}
        name="actionItem"
        value={props.project.actionItem}
        placeholder="current action item"
        rows="3"
      ></textarea>
      <button className="addButton" onClick={props.onAdd}>
        add to board
      </button>
    </form>
  );
}

export default CreateProject;
