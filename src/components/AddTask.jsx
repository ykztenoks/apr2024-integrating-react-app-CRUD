// src/components/AddTask.jsx

import { useState } from "react";
import axios from "axios";

const API_URL = "https://project-management-api-4641927fee65.herokuapp.com";

function AddTask({ projectId, getProject }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  //.post(`${API_URL}/tasks`, requestBody)
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("THIS IS THE REQUEST BODY -> ", {
      title,
      description,
      projectId,
    });
    try {
      if (!title || !description) {
        alert("You have to provide all the values");
        return;
      }
      const response = await axios.post(`${API_URL}/tasks`, {
        title,
        description,
        projectId,
      });

      if (response.status === 200 || response.status === 201) {
        getProject();
        setTitle("");
        setDescription("");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="AddTask">
      <h3>Add New Task</h3>

      <form onSubmit={handleSubmit}>
        <label>Title:</label>
        <input
          type="text"
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <label>Description:</label>
        <textarea
          type="text"
          name="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <button type="submit">Add Task</button>
      </form>
    </div>
  );
}

export default AddTask;
