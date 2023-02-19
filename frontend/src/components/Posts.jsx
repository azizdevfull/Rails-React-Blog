import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function Posts() {
  const [posts, setPosts] = useState([]);
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    fetch("http://localhost:3000/posts", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((response) => response.json())
      .then((data) => setPosts(data))
      .catch((error) => console.error(error));

    fetch("http://localhost:3000/user/index")
      .then((response) => response.json())
      .then((data) => setUsers(data))
      .catch((error) => console.error(error));

    fetch("http://localhost:3000/user/info", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((response) => response.json())
      .then((data) => setCurrentUser(data))
      .catch((error) => console.error(error));
  }, []);

  const deletePost = (postId) => {
    fetch(`http://localhost:3000/posts/${postId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then(() => {
        setPosts(posts.filter((post) => post.id !== postId));
      })
      .catch((error) => console.error(error));
  };

  const getUserEmail = (userId) => {
    const user = users.find((user) => user.id === userId);
    return user ? user.email : "Unknown User";
  };

  return (
    <div>
      <h1>Posts</h1>
      <Link to="/create-post">Create Post</Link>
      <ul>
        {posts.map((post) => (
       <li key={post.id}>
       <h2>{post.title}</h2>
       <p>{post.body}</p>
       {
        console.log(post.image_url)
       }
       {post.image && <img src={post.image_url} alt="Post Image" />}
       <h3>Author: {getUserEmail(post.user_id)}</h3>
       {currentUser && currentUser.id === post.user_id && (
         <button onClick={() => deletePost(post.id)}>Delete</button>
       )}
     </li>
        ))}
      </ul>
    </div>
  );
}

export default Posts;
