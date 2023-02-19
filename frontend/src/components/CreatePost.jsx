import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

function CreatePost() {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [image, setImage] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!title || !body) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Please fill in all required fields.',
      });
      return;
    }
    const formData = new FormData();
    formData.append("post[title]", title);
    formData.append("post[body]", body);
    if (image) {
      formData.append("post[image]", image);
    }
    try {
      const response = await fetch("http://localhost:3000/posts", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: formData,
      });
      if (response.ok) {
        navigate("/posts");
      }
    } catch (error) {
      console.error(error);
    }
  };
  
  const handleImageChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile && ["image/jpeg", "image/png"].includes(selectedFile.type)) {
      setImage(selectedFile);
    } else {
      setImage(null);
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Please upload a JPEG or PNG image.',
      }).then(() => {
        document.getElementById("image").value = "";
      });
    }
  };
  

  return (
    <div>
      <h1>Create Post</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
          />
        </div>
        <div>
          <label htmlFor="body">Body:</label>
          <textarea
            id="body"
            value={body}
            onChange={(event) => setBody(event.target.value)}
          />
        </div>
        <div>
          <label htmlFor="image">Image:</label>
          <input type="file" id="image" onChange={handleImageChange}  />
        </div>
        <button type="submit">Create Post</button>
      </form>
    </div>
  );
}

export default CreatePost;
