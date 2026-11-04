import React, { useState, useEffect } from "react";
import Project from "./Project";
import CreateProject from "./CreateProject";
import "../styles.css";
import { KanbanCard, CardStatus } from "../types";

function App() {
  
  const [project, setProject] = useState({
    ProjectTitle: "",
    owner: "",
    actionItem: "",
    status: "not started" as CardStatus,
  });
  const [projects, setProjects] = useState<KanbanCard[]>(() => {
    const savedProjects = localStorage.getItem("kanban_projects");
    return savedProjects ? JSON.parse(savedProjects) : [];
  });

  useEffect(() => {
    localStorage.setItem("kanban_projects", JSON.stringify(projects));
  }, [projects]);

  function handleChange(
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { name, value } = event.target;
    setProject((prevProject) => {
      return {
        ...prevProject,
        [name]: value,
      };
    });
  }
  function handleClick(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    setProjects((prevProjects) => [
      ...prevProjects,
      { ...project, id: Date.now() },
    ]);
    setProject({
      ProjectTitle: "",
      owner: "",
      actionItem: "",
      status: "not started",
    });
  }

  function handleStatusChange(id: number, newStatus: CardStatus) {
    setProjects((prevProjects) =>
      prevProjects.map((project) =>
        project.id === id ? { ...project, status: newStatus } : project
      )
    );
  }

  function deleteProject(idToDelete: number) {
    setProjects((prevProjects) => {
      return prevProjects.filter((projectItem) => {
        return projectItem.id !== idToDelete;
      });
    });
  }

  function updateOwner(
    e: React.FocusEvent<HTMLInputElement, Element>,
    idToUpdate: number
  ) {
    const newOwner = (e.target as HTMLInputElement).value;

    setProjects((prevProjects) => {
      return prevProjects.map((project) => {
        if (project.id === idToUpdate) {
          return { ...project, owner: newOwner };
        }
        return project;
      });
    });
  }

  function updateAction(
    e: React.FocusEvent<HTMLInputElement, Element>,
    idToUpdate: number
  ) {
    const newAction = (e.target as HTMLInputElement).value;
    setProjects((prevProjects) => {
      return prevProjects.map((project) => {
        if (project.id === idToUpdate) {
          return { ...project, actionItem: newAction };
        }
        return project;
      });
    });
  }
  return (
    <div>
      <CreateProject
        project={project}
        onChange={handleChange}
        onAdd={handleClick}
      />
      {projects.map((project, index) => (
        <Project
          key={project.id || index}
          id={project.id}
          ProjectTitle={project.ProjectTitle}
          owner={project.owner}
          actionItem={project.actionItem}
          status={project.status}
          onActionUpdate={updateAction}
          onOwnerUpdate={updateOwner}
          onDelete={deleteProject}
          onStatusChange={handleStatusChange}
        />
      ))}
    </div>
  );
}

export default App;
