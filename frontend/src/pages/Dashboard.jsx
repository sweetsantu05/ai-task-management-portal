import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function Dashboard() {
  const navigate = useNavigate();
  const [showProfile, setShowProfile] = useState(false);

  const userEmail =
    localStorage.getItem("userEmail") ||
    "User";

  const [tasks, setTasks] = useState([]);

  const [editingId, setEditingId] = useState(null);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("MEDIUM");
  const [status, setStatus] = useState("TODO");
  const [dueDate, setDueDate] = useState("");

  const [loadingAI, setLoadingAI] = useState(false);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await api.get("/tasks");
      setTasks(response.data);
    } catch (error) {
      console.error(error);
      alert("Failed to load tasks");
    }
  };

  const clearForm = () => {
    setEditingId(null);
    setTitle("");
    setDescription("");
    setPriority("MEDIUM");
    setStatus("TODO");
    setDueDate("");
  };

  const createTask = async () => {
    if (!title.trim()) {
      alert("Please enter task title");
      return;
    }

    try {
      await api.post("/tasks", {
        title,
        description,
        priority,
        status,
        dueDate,
      });

      clearForm();
      fetchTasks();
    } catch (error) {
      console.error(error);
      alert("Failed to create task");
    }
  };

  const updateTask = async () => {
    try {
      await api.put(`/tasks/${editingId}`, {
        title,
        description,
        priority,
        status,
        dueDate,
      });

      clearForm();
      fetchTasks();
    } catch (error) {
      console.error(error);
      alert("Failed to update task");
    }
  };

  const deleteTask = async (id) => {
    try {
      await api.delete(`/tasks/${id}`);
      fetchTasks();
    } catch (error) {
      console.error(error);
      alert("Failed to delete task");
    }
  };

  const editTask = (task) => {
    setEditingId(task.id);

    setTitle(task.title || "");
    setDescription(task.description || "");
    setPriority(task.priority || "MEDIUM");
    setStatus(task.status || "TODO");

    setDueDate(
      task.dueDate
        ? task.dueDate.split("T")[0]
        : ""
    );
  };

  const generateAI = async () => {
    if (!title.trim()) {
      alert("Enter task title first");
      return;
    }

    try {
      setLoadingAI(true);

      const response = await api.post(
        `/ai/generate?title=${encodeURIComponent(title)}`
      );

      setDescription(response.data);
    } catch (error) {
      console.error(error);
      alert("AI generation failed");
    } finally {
      setLoadingAI(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <div className="max-w-6xl mx-auto p-8">

        <div className="flex justify-between items-center mb-8">

    <h1 className="text-5xl font-bold">
      AI Task Manager
    </h1>

    <div className="relative">

      <button
        onClick={() =>
          setShowProfile(!showProfile)
        }
        className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center text-xl font-bold"
      >
        👤
      </button>

      {showProfile && (

        <div
          className="
            absolute
            right-0
            mt-3
            w-64
            bg-slate-900
            border
            border-slate-700
            rounded-xl
            shadow-xl
            p-4
            z-50
          "
        >

        <div className="mb-3">

          <p className="text-gray-400 text-sm">
            Logged In As
          </p>

          <p className="font-semibold break-all">
            {userEmail}
          </p>

        </div>

        <button
          onClick={logout}
          className="
            w-full
            bg-red-600
            hover:bg-red-700
            py-2
            rounded-lg
          "
        >
          Logout
        </button>

      </div>

    )}

  </div>

</div>

        <div className="bg-slate-900 p-6 rounded-xl shadow-lg mb-10">

          <h2 className="text-2xl font-semibold mb-5">
            {editingId
              ? "Update Task"
              : "Create New Task"}
          </h2>

          <input
            type="text"
            placeholder="Task Title"
            value={title}
            onChange={(e) =>
              setTitle(e.target.value)
            }
            className="w-full p-3 rounded-lg bg-slate-800 border border-slate-700 mb-4"
          />

          <textarea
            rows="8"
            placeholder="Task Description"
            value={description}
            onChange={(e) =>
              setDescription(e.target.value)
            }
            className="w-full p-3 rounded-lg bg-slate-800 border border-slate-700 mb-4"
          />

          <div className="grid md:grid-cols-3 gap-4 mb-5">

            <div>
              <label className="block mb-2 text-gray-300">
                Priority
              </label>

              <select
                value={priority}
                onChange={(e) =>
                  setPriority(e.target.value)
                }
                className="w-full p-3 rounded-lg bg-slate-800 border border-slate-700"
              >
                <option value="LOW">LOW</option>
                <option value="MEDIUM">MEDIUM</option>
                <option value="HIGH">HIGH</option>
              </select>
            </div>

            <div>
              <label className="block mb-2 text-gray-300">
                Status
              </label>

              <select
                value={status}
                onChange={(e) =>
                  setStatus(e.target.value)
                }
                className="w-full p-3 rounded-lg bg-slate-800 border border-slate-700"
              >
                <option value="TODO">TODO</option>
                <option value="IN_PROGRESS">
                  IN PROGRESS
                </option>
                <option value="DONE">DONE</option>
              </select>
            </div>

            <div>
              <label className="block mb-2 text-gray-300">
                Due Date
              </label>

              <input
                type="date"
                value={dueDate}
                onChange={(e) =>
                  setDueDate(e.target.value)
                }
                className="w-full p-3 rounded-lg bg-slate-800 border border-slate-700"
              />
            </div>

          </div>

          <div className="flex gap-4 flex-wrap">

            <button
              onClick={generateAI}
              className="bg-purple-600 hover:bg-purple-700 px-6 py-3 rounded-lg"
            >
              {loadingAI
                ? "Generating..."
                : "Generate AI"}
            </button>

            <button
              onClick={
                editingId
                  ? updateTask
                  : createTask
              }
              className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg"
            >
              {editingId
                ? "Update Task"
                : "Add Task"}
            </button>

            {editingId && (
              <button
                onClick={clearForm}
                className="bg-gray-600 hover:bg-gray-700 px-6 py-3 rounded-lg"
              >
                Cancel
              </button>
            )}

          </div>

        </div>

        <h2 className="text-3xl font-bold mb-6">
          My Tasks
        </h2>

        <div className="grid gap-5">

          {tasks.map((task) => (
            <div
              key={task.id}
              className="bg-slate-900 p-5 rounded-xl shadow-lg"
            >
              <div className="flex justify-between items-start">

                <div className="flex-1">

                  <h3 className="text-xl font-semibold mb-2">
                    {task.title}
                  </h3>

                  <p className="text-gray-300 whitespace-pre-wrap mb-4">
                    {task.description}
                  </p>

                  <div className="flex flex-wrap gap-3">

                    <span className="bg-blue-600 px-3 py-1 rounded-full text-sm">
                      Priority: {task.priority}
                    </span>

                    <span className="bg-yellow-600 px-3 py-1 rounded-full text-sm">
                      Status: {task.status}
                    </span>

                    <span className="bg-green-600 px-3 py-1 rounded-full text-sm">
                      Due: {task.dueDate || "Not Set"}
                    </span>

                  </div>

                  {task.createdAt && (
                    <p className="text-xs text-gray-500 mt-3">
                      Created:{" "}
                      {new Date(
                        task.createdAt
                      ).toLocaleString()}
                    </p>
                  )}

                </div>

                <div className="flex gap-2 ml-4">

                  <button
                    onClick={() =>
                      editTask(task)
                    }
                    className="bg-yellow-600 hover:bg-yellow-700 px-4 py-2 rounded-lg"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() =>
                      deleteTask(task.id)
                    }
                    className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg"
                  >
                    Delete
                  </button>

                </div>

              </div>
            </div>
          ))}

          {tasks.length === 0 && (
            <div className="text-center text-gray-400 py-10">
              No tasks available
            </div>
          )}

        </div>

      </div>
    </div>
  );
}

export default Dashboard;