import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from 'sweetalert2'

function PostDetails() {
  const [posts, setPosts] = useState([]);
  const [post, setPost] = useState(null);
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const { id } = useParams();
    
  const navigate = useNavigate();
  useEffect(() => {
    async function fetchPost() {
      try {
        const response = await fetch(`http://localhost:3000/posts/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        if (response.ok) {
          const data = await response.json();
          setPost(data.attributes);
        }
      } catch (error) {
        console.error(error);
      }
    }
    fetch("http://localhost:3000/user/index")
      .then((response) => response.json())
      .then((data) => setUsers(data))
      .catch((error) => console.error(error));

      if (localStorage.getItem("token")){
      fetch("http://localhost:3000/user/info", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
        .then((response) => response.json())
        .then((data) => setCurrentUser(data))
        .catch((error) => console.error(error));
    }
    fetchPost();
  }, [id]);

  if (!post) {
    return <div>Loading post...</div>;
  }
  
  const deletePost = (postId) => {
    fetch(`http://localhost:3000/posts/${postId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then(() => {
        setPosts(posts.filter((post) => post.id !== postId));
        Swal.fire({
          icon: 'success',
          title: 'Success!',
          text: 'Successfully deleted post!',
        });
        navigate("/posts");
      })
      .catch((error) => console.error(error));
  };
  
  const getUserEmail = (userId) => {
    const user = users.find((user) => user.id === userId);
    return user ? user.email : "Unknown User";
  };

  return (
    <div>
      <h1>{post.title}</h1>
      <p>{post.body}</p>
      <h3>Author: {getUserEmail(post.user_id)}</h3>
      {post.image && <img src={post.image_url} alt={post.title} width={200} height={200} />}
      {currentUser && currentUser.id === post.user_id && (
         <button onClick={() => deletePost(post.id)}>Delete</button>
       )}
    </div>
  );
}

export default PostDetails;
