import React, { useEffect, useState } from "react";
import { AppDispatch, RootState } from "../redux";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux/es/exports";
import {
  changeStatusTodoThunk,
  deleteTodoThunk,
  getTodoThunk,
} from "../redux/slice/todoThunk";
import { Todos } from "../redux/slice/todoSlice";
export const TodoContent = () => {
  const { todos } = useSelector((state: RootState) => state.todos);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(getTodoThunk());
  }, [dispatch]);
  console.log(todos);

  const deleteTodoHandler = (id: string) => dispatch(deleteTodoThunk(id));
  const handleChangeStatus = (item: Todos) => {
    dispatch(
      changeStatusTodoThunk({
        title: item.title,
        date: item.date,
        complate: !item.complate,
        id: item.id,
      })
    );
  };

  return (
    <div className="flex w-full justify-center mt-20">
      <table className="table w-[900px]">
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Date</th>
            <th>Complete</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {todos.map((item) => {
            return (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td className={`${item.complate ? "line-through text-red-400" : ""}`}>{item.title}</td>
                <td>{item.date}</td>
                <td>
                  <input
                    className="checkbox checkbox-primary"
                    type="checkbox"
                    name=""
                    id=""
                    checked={item.complate}
                    onChange={() => handleChangeStatus(item)}
                  />
                </td>
                <td>
                  <button
                    disabled={!item.complate}
                    className="btn btn-square btn-primary pl-9 pr-9"
                    onClick={() => deleteTodoHandler(item.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
