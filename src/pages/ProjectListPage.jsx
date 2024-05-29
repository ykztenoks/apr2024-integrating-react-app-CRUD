// src/pages/ProjectListPage.jsx

import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const API_URL = "https://project-management-api-4641927fee65.herokuapp.com";

function ProjectListPage() {
  const [projects, setProjects] = useState(null);

  const getAllProjects = async () => {
    try {
      const response = await axios.get(`${API_URL}/projects?_embed=tasks`);

      setProjects(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  // We set this effect will run only once, after the initial render
  // by setting the empty dependency array - []
  useEffect(() => {
    getAllProjects();
  }, []);

  return (
    <div className="ProjectListPage">
      {projects ? (
        projects.map((project) => {
          return (
            <div className="ProjectCard card" key={project.id}>
              <Link to={`/projects/${project.id}`}>
                <h3>{project.title}</h3>
              </Link>
            </div>
          );
        })
      ) : (
        <p>Loading ... 🕒</p>
      )}
    </div>
  );
}

export default ProjectListPage;
