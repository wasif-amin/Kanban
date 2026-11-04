import React, { ChangeEventHandler, useState } from "react";

interface CreateProjectProps {
  project: {
    ProjectTitle: string;
    owner: string;
    actionItem: string;
  };
  onChange: (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  onAdd: (event: React.MouseEvent<HTMLButtonElement>) => void;
}
function CreateProject(props: CreateProjectProps) {
  const [title, setTitle] = useState("");
  const [owner, setOwner] = useState("");
  const [actionItem, setActionItem] = useState("");
  return (
    <form className="create">
      <input
        onChange={props.onChange}
        name="ProjectTitle"
        value={props.project.ProjectTitle}
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
        rows={3}
      ></textarea>
      <button className="addButton" onClick={props.onAdd}>
        add to board
      </button>
    </form>
  );
}

export default CreateProject;
