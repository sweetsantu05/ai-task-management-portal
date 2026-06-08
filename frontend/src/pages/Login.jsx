import { useState } from "react";
import api from "../services/api";
import { useNavigate, Link } from "react-router-dom";

function Login() {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {

      const response = await api.post("/auth/login", {
        email,
        password
      });

      localStorage.setItem(
        "token",
        response.data.token
      );
      localStorage.setItem(
        "userEmail",
        email
      );

      navigate("/dashboard");

    } catch (error) {

      alert("Invalid credentials");
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center">

      <div className="bg-slate-900 p-10 rounded-2xl shadow-2xl w-full max-w-md">

        <h1 className="text-4xl font-bold text-white text-center mb-8">
          Welcome Back
        </h1>

        <form onSubmit={handleLogin} className="space-y-4">

          <input
            type="email"
            placeholder="Email"
            className="w-full p-3 rounded-lg bg-slate-800 text-white border border-slate-700"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full p-3 rounded-lg bg-slate-800 text-white border border-slate-700"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-lg"
          >
            Login
          </button>

        </form>

        <p className="text-gray-400 text-center mt-6">
          New User?
          <Link
            to="/register"
            className="text-blue-400 ml-2"
          >
            Register
          </Link>
        </p>

      </div>

    </div>
  );
}

export default Login;