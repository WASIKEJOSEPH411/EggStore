import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Signin.css";

const Signin = () => {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
 
  const navigate = useNavigate();

  // Handle Input Change
  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  // Form Submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (!credentials.email || !credentials.password) {
      setError("All fields are required.");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/auth/signin", credentials);
      localStorage.setItem("token", response.data.token);
      
      navigate("/"); // Redirect after successful login
    } catch (err) {
      setError("Invalid email or password.");
      console.error("Signin error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signin-page">
      <div className="signin-container">
        <h2>Sign In</h2>

        {error && <p className="error">{error}</p>}

        <form onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={credentials.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={credentials.password}
            onChange={handleChange}
            required
          />
          <button type="submit" disabled={loading}>
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signin;
