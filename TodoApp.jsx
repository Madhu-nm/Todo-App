import React, { use, useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css"
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './TodoApp.css'

export default function TodoApp() {

    const [task, setTask] = useState({ taskname: "", description: "", category: "" })
    const [taskList, setTasklist] = useState([])
    const [categorize, setCategorize] = useState("All")
    const [error, setError] = useState("")
    const [isEditing, setIsEditing] = useState(false);
    const [editId, setEditId] = useState(null);

    async function getTasklist() {
        const response = await fetch("http://localhost:8080/api/todoapp")
        const res = await response.json();
        setTasklist(res)
    }
    useEffect(() => {
        getTasklist();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setTask({ ...task, [name]: value })
    }
    const addTask = async () => {
        if (!task.taskname || !task.description || !task.category) {
            setError("Fill the all details")
        }
        else {

            const url = isEditing
                ? `http://localhost:8080/api/todoapp/${editId}`
                : "http://localhost:8080/api/todoapp";
            const method = isEditing ? "PUT" : "POST";


            await fetch(url, {
                method: method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(task),
            });
            getTasklist();
            setTask({ taskname: "", description: "", category: "" })
            setError("")
            setIsEditing(false);
            setEditId(null);
            const closeButton = document.querySelector('[data-bs-dismiss="modal"]');
            closeButton && closeButton.click();

        }
    }

    function updateTask(e) {
        setTask(e)
    }

    async function deleteTask(id) {
        await fetch(`http://localhost:8080/api/todoapp/${id}`, {
            method: 'DELETE',
        })
        getTasklist();


    }
    const filteredTasks = categorize === "All" ? taskList : taskList.filter((t) => t.category === categorize);

    return (
        <>
            <div className="main">
                <h2 className="fw-bold m-2 p-2 text-center">TODO LIST</h2>

                <div className="row g-0 justify-content-center m-2">
                    <div className="col-md-2 col ">
                        <button type="button" className="w-100 btn btn-primary fw-bold " data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={() => {
                            setTask({ taskname: "", description: "", category: "" });
                            setIsEditing(false);
                            setEditId(null);
                            setError("");
                        }} >
                            Add Task
                        </button>
                    </div>
                    <div className="col-md-2 col ">
                        <select className="form-select w-100 bg-body-secondary" name="category" value={categorize} onChange={(e) => setCategorize(e.target.value)}>
                            <option value="All">All Tasks</option>
                            <option value="Personal">Personal</option>
                            <option value="Professional">Professional</option>
                            <option value="Others">Others</option>
                        </select>
                    </div>
                </div>
                <div className="modal fade" id="exampleModal" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content bg-body-secondary">
                            <div className="modal-header">
                                <h1 className="modal-title fs-5 fw-bold" id="exampleModalLabel">{isEditing ? "Edit Task" : "Add Task"}</h1>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={() => {
                                    setTask({ taskname: "", description: "", category: "" });
                                    setIsEditing(false);
                                    setEditId(null);
                                    setError("");
                                }}></button>
                            </div>
                            {error && <div style={{ color: "red", textAlign: "center" }}>{error}</div>}
                            <div className="modal-body ">

                                <label className="form-label">Task Name</label>
                                <input type="text" className="form-control mb-3" name="taskname" placeholder="Office meeting" value={task.taskname} onChange={handleChange}></input>
                                <label className="form-label">Task Description</label>
                                <input type="text" className="form-control mb-3" name="description" placeholder="Meeting about marketing at 11.00am" value={task.description} onChange={handleChange}></input>
                                <label className="form-label">Category</label>
                                <select className="form-select " name="category" value={task.category} onChange={handleChange}>
                                    <option value="">Select</option>
                                    <option value="Personal">Personal</option>
                                    <option value="Professional">Professional</option>
                                    <option value="Others">Others</option>
                                </select>

                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={() => {
                                    setError("");
                                    setIsEditing(false);
                                    setEditId(null);
                                    setTask({ taskname: "", description: "", category: "" });
                                }}>Close</button>
                                <button type="button" className="btn btn-primary" onClick={addTask}>{isEditing ? "Update Task" : "Save Task"}</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row justify-content-center m-2">
                    <div className="taskList bg-body-secondary m-5 mt-4 border border-black rounded p-2  col-md-6">
                        {filteredTasks.length > 0 ?
                            (filteredTasks.map((e) => (
                                <div key={e.id} className="bg-white mb-2 m-1 row g-0 ">
                                    <div className="col p-2">
                                        <p className="m-0">&#128205;{e.taskname}</p>
                                        <p style={{ color: "grey" }} className="m-0"> {e.description} - {e.category}</p>
                                    </div>
                                    <div className="col-2 col-md-1 p-2">
                                        <button type="button" className="border border-0 bg-body-secondary m-1 p-2 " onClick={() => deleteTask(e.id)}><i className="fa-solid fa-trash "></i></button>
                                    </div>

                                    <div className="col-2 col-md-1 p-2">
                                        <button type="button" onClick={() => updateTask(e)} className="border border-0 bg-body-secondary m-1 p-2 " data-bs-toggle="modal" data-bs-target="#exampleModal">
                                            <i className="fa-solid fa-pen"></i>
                                        </button>
                                    </div>

                                </div>
                            )))
                            : <p className="bg-white text-center b p-2 m-1">No task found</p>}
                    </div>
                </div>


            </div>


        </>
    )
}