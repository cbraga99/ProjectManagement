import { useState } from "react";
import NewProject from "./components/NewProject";
import NoProjectSelected from "./components/NoProjectSelected";
import ProjectsSidebar from "./components/ProjectsSidebar";
import SelectedProject from "./components/SelectedProject";

function App() {
  const [projectsState, setProjectsState] = useState({
    selectedProjectId: undefined,
    projects: [],
  });

  function handleAddTask(text) {
    setProjectsState((prevState) => {
      return {
        ...prevState,
        projects: prevState.projects.map(project => {
          if (project.id === prevState.selectedProjectId) {
            project.tasks = project.tasks.concat({ text, id: Math.random() });
          }
          return project;
        })        
      };
    });
  }
   
  function handleDeleteTask(id) {
    setProjectsState((prevState) => {
      return {
        ...prevState,
        projects: prevState.projects.map(project => {
          if (project.id === prevState.selectedProjectId) {
            project.tasks = project.tasks.filter(task => task.id !== id);
          }
          return project;
        })
      };
    });
  }

  function handleSelectProject(id) {
    setProjectsState((prevState) => {
      return {
        ...prevState,
        selectedProjectId: id,
      };
    });
  }

  function handleStartAddProject() {
    setProjectsState((prevState) => {
      return {
        ...prevState,
        selectedProjectId: null,
      };
    });
  }

  function handleCancelAddProject() {
    setProjectsState((prevState) => {
      return {
        ...prevState,
        selectedProjectId: undefined,
      };
    });
  }

  function handleAddProject(projectData) {
    setProjectsState((prevState) => {
        const projectId = Math.random();
      const newProject = {
        ...projectData,
        id: projectId,
        tasks: []
      };
      return {
        ...prevState,
        selectedProjectId: undefined,
        projects: [...prevState.projects, newProject],
      };
    });
  }

  function handleDeleteProject(){
    setProjectsState((prevState) => {
        return {
          ...prevState,
          selectedProjectId: undefined,
          projects: prevState.projects.filter((project)=> project.id!==prevState.selectedProjectId)
        };
      });
  }

  const selectedProject = projectsState.projects.find(project => project.id == projectsState.selectedProjectId);

  let content = <SelectedProject project={selectedProject} onDelete={handleDeleteProject} onAddTask={handleAddTask} onDeleteTask={handleDeleteTask} />;

  if (projectsState.selectedProjectId === null) {
    content = (
      <NewProject onAdd={handleAddProject} onCancel={handleCancelAddProject} />
    );
  } else if (projectsState.selectedProjectId === undefined) {
    content = <NoProjectSelected onStartAddProject={handleStartAddProject} />;
  }

  return (
    <>
      <main className="h-screen my-8 flex gap-8">
        <ProjectsSidebar
          onStartAddProject={handleStartAddProject}
          projects={projectsState.projects}
          onSelectProject={handleSelectProject}
          selectedProjectId={projectsState.selectedProjectId}
        />
        {/* <NoProjectSelected onStartAddProject={handleStartAddProject} /> */}
        {content}
      </main>
    </>
  );
}

export default App;
