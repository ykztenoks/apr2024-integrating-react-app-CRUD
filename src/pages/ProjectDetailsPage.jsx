// src/pages/ProjectDetailsPage.jsx

import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import AddTask from "../components/AddTask";
const API_URL = "https://project-management-api-4641927fee65.herokuapp.com";

function ProjectDetailsPage(props) {
  const [project, setProject] = useState(null);
  const { projectId } = useParams();
  const navigate = useNavigate();

  const getProject = async () => {
    try {
      const response = await axios.get(
        `${API_URL}/projects/${projectId}?_embed=tasks`
      );

      setProject(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProject();
  }, []);

  const handleDelete = async () => {
    try {
      const wantToDelete = confirm("Do you really want to delete?");

      if (wantToDelete) {
        const response = await axios.delete(`${API_URL}/projects/${projectId}`);
        console.log(response);
        navigate("/projects");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="ProjectDetailsPage">
      <h1>Project details</h1>
      {project && (
        <>
          <h1>{project.title}</h1>
          <p>{project.description}</p>

          <AddTask projectId={project.id} getProject={getProject} />

          {project.tasks &&
            project.tasks.map((task) => (
              <div className="TaskCard card" key={task.id}>
                <h3>{task.title}</h3>
                <h4>Description:</h4>
                <p>{task.description}</p>
              </div>
            ))}
        </>
      )}

      <Link to="/projects">
        <button>Back to projects</button>
      </Link>
      <Link to={`/projects/edit/${projectId}`}>
        <button>Edit Project</button>
      </Link>
      <button onClick={handleDelete}>
        <img
          src="https://cdn1.iconfinder.com/data/icons/hawcons/32/699013-icon-27-trash-can-512.png"
          alt="delete button"
          style={{ width: "30px", height: "30px", cursor: "pointer" }}
        />
      </button>
    </div>
  );
}

export default ProjectDetailsPage;
