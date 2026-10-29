import React from "react";
import { KanbanCard,  CardStatus } from "../types";

interface CreateProjectProps {
  onAddProject: (
    title: string,
    owner: string,
    action: string,
    status: CardStatus,
  ) => void;
}

function CreateProject(props: { onChange: React.ChangeEventHandler<HTMLInputElement> | React.ChangeEventHandler<HTMLTextAreaElement> | undefined; project: { projectTitle: string | number | readonly string[] | undefined; owner: string | number | readonly string[] | undefined; actionItem: string | number | readonly string[] | undefined; }; onAdd: React.MouseEventHandler<HTMLButtonElement> | undefined; }) {
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
