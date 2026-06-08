import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function Dashboard() {

  const navigate = useNavigate();

  const [tasks,setTasks] = useState([]);
  const [title,setTitle] = useState("");

  useEffect(() => {

    fetchTasks();

  }, []);

  const fetchTasks = async () => {

    const response =
      await api.get("/tasks");

    setTasks(response.data);
  };

  const createTask = async () => {

    if (!title.trim()) return;

    await api.post("/tasks", {
      title,
      description
    });

    setTitle("");
    setDescription("");

    fetchTasks();
  };

  const deleteTask = async (id) => {

    await api.delete(`/tasks/${id}`);

    fetchTasks();
  };

  const logout = () => {

    localStorage.removeItem("token");

    navigate("/");
  };

  const [description, setDescription] = useState("");

  return (

    <div className="min-h-screen bg-slate-950 text-white p-8">

      <div className="max-w-4xl mx-auto">

        <div className="flex justify-between items-center mb-8">

          <h1 className="text-5xl font-bold">
            Task Dashboard
          </h1>

          <button
            onClick={logout}
            className="bg-red-600 px-4 py-2 rounded-lg"
          >
            Logout
          </button>

        </div>

        <div className="bg-slate-900 p-6 rounded-xl mb-8">

          <div className="flex gap-4">

            <input
              type="text"
              placeholder="Enter Task"
              value={title}
              onChange={(e)=>setTitle(e.target.value)}
              className="flex-1 p-3 rounded-lg bg-slate-800 border border-slate-700"
            />
            <textarea
              placeholder="Task Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="flex-1 p-3 rounded-lg bg-slate-800 border border-slate-700 text-white"
            />

            <button
              onClick={createTask}
              className="bg-blue-600 px-6 rounded-lg"
            >
              Add Task
            </button>

          </div>

        </div>

        <div className="grid gap-4">

          {tasks.map((task) => (

            <div
              key={task.id}
              className="bg-slate-900 p-5 rounded-xl flex justify-between items-center"
            >

              <div>
              <h3 className="text-lg font-semibold">
                {task.title}
              </h3>

              <p className="text-gray-400 mt-1">
                {task.description}
              </p>
            </div>

              <button
                onClick={() =>
                  deleteTask(task.id)
                }
                className="bg-red-600 px-4 py-2 rounded-lg"
              >
                Delete
              </button>

            </div>

          ))}

        </div>

      </div>

    </div>
  );
}

export default Dashboard;