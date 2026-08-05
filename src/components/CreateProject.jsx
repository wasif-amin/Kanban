import React from "react";

function CreateProject(props) {
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
