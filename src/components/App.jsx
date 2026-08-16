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
    setProjects((prevProjects) => {
      return [...prevProjects, project];
    });
    setProject({ projectTitle: "", owner: "", actionItem: "" });
  }
  function deleteProject(id) {
    setProjects((prevProjects) => {
      return prevProjects.filter((projectItem, index) => {
        return index !== id;
      });
    });
  }

  function updateOwner(event, id) {
    const newOwner = event.target.value;
    setProjects((prevProjects) => {
      return prevProjects.map((prevProject, index) => {
        if (index === id) {
          return { ...prevProject, owner: newOwner };
        }
        return prevProject;
      });
    });
  }
  function updateAction(event, id) {
    const newAction = event.target.value;
    setProjects((prevProjects) => {
      return prevProjects.map((prevProject, index) => {
        if (index === id) {
          return { ...prevProject, actionItem: newAction };
        }
        return prevProject;
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
          id={index}
          ProjectTitle={project.projectTitle}
          owner={project.owner}
          actionItem={project.actionItem}
          onActionUpdate={updateAction}
          onOwnerUpdate={updateOwner}
        />
      ))}
    </div>
  );
}

export default App;
