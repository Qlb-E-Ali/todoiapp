import React, { useState } from "react";
import { AiOutlineEdit } from "react-icons/ai";
import { RiDeleteBin6Line } from "react-icons/ri";

const Todo = () => {
  const [todoData, setTodoData] = useState([]);
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [update, setUpdate] = useState(null);

  const handleAdd = () => {
    if (!title.trim() || !text.trim()) return;
    const obj = { title, text };
    setTodoData([...todoData, obj]);
    setText("");
    setTitle("");
  };

  const handleRemove = (index) => {
    const newArray = todoData.filter((_, ind) => ind !== index);
    setTodoData(newArray);
  };

  const handleEdit = (index) => {
    setUpdate(index);
    const { title, text } = todoData[index];
    setTitle(title);
    setText(text);
  };

  const handleUpdate = () => {
    if (update === null) return;
    const task = [...todoData];
    task[update] = { ...task[update], title, text };
    setTodoData(task);
    setText("");
    setTitle("");
    setUpdate(null);
  };

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-10 sm:px-6 lg:px-8">
      <div className="w-full max-w-2xl mx-auto bg-white shadow-lg rounded-xl p-6 sm:p-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-center text-gray-800 mb-6">Todo App</h1>

        <div className="flex flex-col gap-4 mb-6">
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border rounded px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400 text-base sm:text-lg"
          />
          <input
            type="text"
            placeholder="Task"
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="border rounded px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400 text-base sm:text-lg"
          />

          {update === null ? (
            <button
              onClick={handleAdd}
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded shadow transition text-sm sm:text-base"
            >
              Add Task
            </button>
          ) : (
            <button
              onClick={handleUpdate}
              className="bg-green-600 hover:bg-green-700 text-white font-semibold px-4 py-2 rounded shadow transition text-sm sm:text-base"
            >
              Update Task
            </button>
          )}
        </div>

        <div className="bg-gray-50 rounded-lg p-4 max-h-64 overflow-y-auto shadow-inner">
          {todoData.length === 0 ? (
            <p className="text-center text-gray-400 text-sm sm:text-base">No tasks yet.</p>
          ) : (
            todoData.map((item, index) => (
              <div
                key={index}
                className="flex flex-col sm:flex-row sm:justify-between sm:items-start bg-white p-4 mb-4 rounded-lg shadow"
              >
                <div className="mb-2 sm:mb-0">
                  <h2 className="text-lg sm:text-xl font-semibold text-blue-700">{item.title}</h2>
                  <p className="text-gray-700 text-sm sm:text-base">{item.text}</p>
                </div>
                <div className="flex items-center gap-3">
                  <AiOutlineEdit
                    onClick={() => handleEdit(index)}
                    className="text-xl sm:text-2xl text-green-600 cursor-pointer hover:scale-110 transition"
                  />
                  <RiDeleteBin6Line
                    onClick={() => handleRemove(index)}
                    className="text-xl sm:text-2xl text-red-600 cursor-pointer hover:scale-110 transition"
                  />
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Todo;
