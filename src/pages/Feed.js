import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";

const Feed = () => {
  const [posts, setPosts] = useState([]);

  
  const fetchPosts = useCallback(async () => {
    try {
      const res = await axios.get(
        "https://social-app-backend-1-c98y.onrender.com/posts"
      );
      setPosts(res.data);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  }, []);

  
  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  return (
    <div style={{ padding: "20px" }}>
      <h2>Feed</h2>

      {posts.length === 0 ? (
        <p>No posts available</p>
      ) : (
        posts.map((post) => (
          <div
            key={post._id}
            style={{
              border: "1px solid #ccc",
              padding: "10px",
              marginBottom: "10px",
              borderRadius: "8px",
            }}
          >
            <h3>{post.title}</h3>
            <p>{post.content}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default Feed;
