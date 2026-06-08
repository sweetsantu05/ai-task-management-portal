import { useState } from "react";
import api from "../services/api";
import { Link } from "react-router-dom";

function Register() {

  const [name,setName] = useState("");
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");

  const handleRegister = async (e) => {

    e.preventDefault();

    try {

      await api.post("/auth/register", {
        name,
        email,
        password
      });

      alert("Registration Successful");

    } catch {

      alert("Registration Failed");
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center">

      <div className="bg-slate-900 p-10 rounded-2xl shadow-2xl w-full max-w-md">

        <h1 className="text-4xl font-bold text-white text-center mb-8">
          Create Account
        </h1>

        <form
          onSubmit={handleRegister}
          className="space-y-4"
        >

          <input
            type="text"
            placeholder="Name"
            className="w-full p-3 rounded-lg bg-slate-800 text-white border border-slate-700"
            value={name}
            onChange={(e)=>setName(e.target.value)}
          />

          <input
            type="email"
            placeholder="Email"
            className="w-full p-3 rounded-lg bg-slate-800 text-white border border-slate-700"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full p-3 rounded-lg bg-slate-800 text-white border border-slate-700"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
          />

          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 text-white p-3 rounded-lg"
          >
            Register
          </button>

        </form>

        <p className="text-gray-400 text-center mt-6">

          Already have an account?

          <Link
            to="/"
            className="text-blue-400 ml-2"
          >
            Login
          </Link>

        </p>

      </div>

    </div>
  );
}

export default Register;