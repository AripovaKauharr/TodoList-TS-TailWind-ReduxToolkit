import React, { useState } from "react";
import { useDispatch } from "react-redux/es/exports";
import { AppDispatch } from "../redux";
import { saveTodoThunk } from "../redux/slice/todoThunk";

const TodoForm = () => {
  const [form, setForm] = useState<{ title: string; date: string }>({
    title: "",
    date: "",
  });
  const formChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const dispatch = useDispatch<AppDispatch>();
  const submitHandler = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(form);
    dispatch(
      saveTodoThunk({
        title: form.title,
        date: form.date,
        complate: false,
        id: Date.now().toString(),
      })
    );
    setForm({ title: "", date: "" });
  };

  const eneble = form.title.trim().length > 0 && form.date.trim().length > 0;
  return (
    <div className="w-full flex justify-center">
      <form
        onSubmit={submitHandler}
        className="flex items-center justify-center gap-4 mt-3"
      >
        <input
          name="title"
          type="text"
          placeholder="Write your task..."
          value={form.title}
          onChange={formChangeHandler}
          className="input"
        />
        <input
          name="date"
          type="date"
          placeholder="Choose the date"
          value={form.date}
          onChange={formChangeHandler}
          className="input"
        />
        <button disabled={!eneble} className="btn btn-primary" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};

export default TodoForm;
