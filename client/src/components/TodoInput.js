import React, { useEffect, useState } from "react";
import axios from "axios";

const TodoInput = ({ getData }) => {
  useEffect(() => {
    getData();
  }, []);

  const addTodo = async (e) => {
    e.preventDefault();
    const content = e.target.text.value;
    await axios.post(`http://localhost:4001/todo`, {
      content
    });
    getData();
  };

  return (
    <form onSubmit={addTodo}>
      <input name="text" />
      <input type="submit" value="추가" />
    </form>
  );
};

export default TodoInput;
