import React, { useState, useEffect } from "react";
import Project from "./Project";
import CreateProject from "./CreateProject";
import "../styles.css";

function App() {
  const [project, setProject] = useState({
    projectTitle: "",
    owner: "",
    actionItem: "",
  });
  const [projects, setProjects] = useState(() => {
    const savedProjects = localStorage.getItem("kanban_projects");
    return savedProjects ? JSON.parse(savedProjects) : [];
  });

  useEffect(() => {
    localStorage.setItem("kanban_projects", JSON.stringify(projects));
  }, [projects]);

  function handleChange(event) {
    const { name, value } = event.target;
    setProject((prevProject) => {
      return {
        ...prevProject,
        [name]: value,
      };
    });
  }
  function handleClick(event) {
    event.preventDefault();
    setProjects((prevProjects) => [
      ...prevProjects,
      { ...project, id: Date.now() },
    ]);
    setProject({
      projectTitle: "",
      owner: "",
      actionItem: "",
      status: "notStarted",
    });
  }

  function handleStatusChange(id, newStatus) {
    setProjects((prevProjects) =>
      prevProjects.map((project) =>
        project.id === id ? { ...project, status: newStatus } : project
      )
    );
  }

  function deleteProject(idToDelete) {
    setProjects((prevProjects) => {
      return prevProjects.filter((projectItem) => {
        return projectItem.id !== idToDelete;
      });
    });
  }

  function updateOwner(event, idToUpdate) {
    const newOwner = event.target.value;
    setProjects((prevProjects) => {
      return prevProjects.map((project) => {
        if (project.id === idToUpdate) {
          return { ...project, owner: newOwner };
        }
        return project;
      });
    });
  }

  function updateAction(event, idToUpdate) {
    const newAction = event.target.value;
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
          ProjectTitle={project.projectTitle}
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
