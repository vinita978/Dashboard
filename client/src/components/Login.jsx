 import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
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


  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      alert("Please fill all fields");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`${API_BASE}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (data.auth) {
        // ✅ Store FULL object (important)
        localStorage.setItem("user", JSON.stringify(data));
        navigate("/");
      } else {
        alert("Invalid email or password");
      }
    } catch (error) {
      alert("Server not reachable");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-16 flex items-center justify-center bg-gray-100 min-h-[70vh] px-4">
      <form
        onSubmit={handleLogin}
        className="bg-white shadow-md rounded p-6 w-full max-w-sm"
      >
        <h2 className="text-base font-semibold mb-4 text-center">
          Login
        </h2>

        <input
          type="email"
          placeholder="Email"
          className="border w-full p-2 mb-3 text-sm rounded focus:outline-none focus:ring-2 focus:ring-black"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="border w-full p-2 mb-4 text-sm rounded focus:outline-none focus:ring-2 focus:ring-black"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          type="submit"
          disabled={loading}
          className="bg-black text-white w-full py-2 text-sm font-semibold rounded active:scale-95 transition disabled:opacity-60"
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
};

export default Login;
