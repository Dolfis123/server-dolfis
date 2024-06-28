import React, { useState } from "react";
import axios from "axios";
import "../../index.css";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("https://dolfis.store/api/login", {
        email,
        password,
      });
      if (response.data.Status === "Success") {
        sessionStorage.setItem("token", response.data.Token);
        window.location.href = "/dashboard"; // Redirect to dashboard
      } else {
        setError(response.data.Error);
      }
    } catch (err) {
      console.error("Error logging in:", err);
      setError("An error occurred. Please try again.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="shadow-xl shadow-red-200 p-5 rounded-xl">
        <h1 className="text-4xl font-bold mb-5 text-center">Masuk</h1>
        {error && <div className="text-red-500 mb-5">{error}</div>}
        <form onSubmit={handleLogin}>
          <input
            className="border p-3 rounded-lg mb-5 w-full outline-none"
            type="text"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            className="border p-3 rounded-lg mb-5 w-full outline-none"
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            className="border p-3 rounded-lg w-full bg-blue-700 text-white hover:bg-blue-600 transition"
            type="submit"
          >
            Masuk
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
