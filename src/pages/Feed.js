import { useEffect, useState } from "react";
import BASE_URL from "../api";

export default function Feed({ user, setUser }) {
  const [posts, setPosts] = useState([]);
  const [text, setText] = useState("");

  const token = localStorage.getItem("token"); // token

  const fetchPosts = async () => {
    const res = await fetch(`${BASE_URL}/api/posts`, {
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
    });
    const data = await res.json();
    setPosts(data);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const createPost = async () => {
    await fetch(`${BASE_URL}/api/posts/create`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify({ userId: user._id, username: user.name, text }),
    });
    setText("");
    fetchPosts();
  };

  const likePost = async (id) => {
    await fetch(`${BASE_URL}/api/posts/like/${id}`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify({ username: user.name }),
    });
    fetchPosts();
  };

  const commentPost = async (id, comment) => {
    await fetch(`${BASE_URL}/api/posts/comment/${id}`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify({ username: user.name, text: comment }),
    });
    fetchPosts();
  };

  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <div>
      <h2>Feed</h2>
      <button onClick={logout}>Logout</button>

      <input value={text} onChange={(e) => setText(e.target.value)} />
      <button onClick={createPost}>Post</button>

      {posts.map((p) => (
        <div key={p._id} style={{ border: "1px solid black", margin: 10 }}>
          <h4>{p.username}</h4>
          <p>{p.text}</p>
          <button onClick={() => likePost(p._id)}>Like ({p.likes.length})</button>
          <input placeholder="comment"
            onKeyDown={(e) => { if (e.key === "Enter") commentPost(p._id, e.target.value); }} />
          <p>Comments: {p.comments.length}</p>
        </div>
      ))}
    </div>
  );
}

