import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const API_BASE = "http://192.168.1.38:5000";

  // 🔹 Redirect if already logged in
  useEffect(() => {
  const user = localStorage.getItem("user");
  if (user) {
    navigate("/", { replace: true });
  }
// eslint-disable-next-line react-hooks/exhaustive-deps
}, []);


  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !email || !password) {
      alert("Please fill all fields");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`${API_BASE}/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await response.json();

      if (data.auth) {
        // ✅ Store FULL response (important)
        localStorage.setItem("user", JSON.stringify(data));
        navigate("/");
      } else {
        alert("Registration failed");
      }
    } catch (error) {
      alert("Server not reachable");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-16 min-h-[70vh] flex items-center justify-center bg-gray-100 px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-md w-full max-w-sm"
      >
        <h1 className="text-base font-semibold text-center mb-4 text-gray-700">
          Registration
        </h1>

        <input
          type="text"
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-2 text-sm border rounded mb-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 text-sm border rounded mb-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <input
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 text-sm border rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-500 text-white py-2 text-sm rounded font-semibold active:scale-95 transition disabled:opacity-60"
        >
          {loading ? "Creating account..." : "Sign Up"}
        </button>
      </form>
    </div>
  );
};

export default Signup;
