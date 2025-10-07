import React, { useState } from "react";
import Profile from "./components/Profile";
import Projects from "./components/Projects";
import Blog from "./components/Blog";
import Contact from "./components/Contact";

function App() {
  // --- Login State ---
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [loginData, setLoginData] = useState({ username: "", password: "" });

  // --- Fake Login Handler ---
  const handleLogin = (e) => {
    e.preventDefault();
    if (loginData.username && loginData.password) {
      setIsLoggedIn(true);
      setUser({ name: loginData.username });
      setLoginData({ username: "", password: "" });
    } else {
      alert("Please enter username and password");
    }
  };

  // --- Logout Handler ---
  const handleLogout = () => {
    setIsLoggedIn(false);
    setUser(null);
  };

  // --- Portfolio States ---
  const [profile, setProfile] = useState({
    name: "Your Name",
    bio: "Short bio about yourself.",
    technologies: ["React", "JavaScript", "HTML", "CSS"]
  });

  const [projects, setProjects] = useState([
    {
      title: "Portfolio Website",
      description: "A personal portfolio built with React.",
      link: "https://github.com/yourusername/portfolio"
    }
  ]);

  const [blogs, setBlogs] = useState([
    {
      title: "Getting Started with React",
      content: "React is a great library for building UIs..."
    }
  ]);

  return (
    <div style={{ margin: "20px", fontFamily: "Arial" }}>
      <h1>Developer Portfolio</h1>

      {!isLoggedIn ? (
        // --- Login Form ---
        <form onSubmit={handleLogin}>
          <h2>Login</h2>
          <input
            type="text"
            placeholder="Username"
            value={loginData.username}
            onChange={(e) =>
              setLoginData({ ...loginData, username: e.target.value })
            }
          />
          <br />
          <input
            type="password"
            placeholder="Password"
            value={loginData.password}
            onChange={(e) =>
              setLoginData({ ...loginData, password: e.target.value })
            }
          />
          <br />
          <button type="submit">Login</button>
        </form>
      ) : (
        // --- Portfolio ---
        <>
          <p>Welcome, {user.name}!</p>
          <button onClick={handleLogout}>Logout</button>

          <Profile profile={profile} />
          <Projects projects={projects} />
          <Blog blogs={blogs} />
          <Contact />
        </>
      )}
    </div>
  );
}

export default App;
