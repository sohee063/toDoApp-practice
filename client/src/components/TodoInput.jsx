import React, { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";

const TodoInput = ({ getData }) => {
  useEffect(() => {
    getData();
  }, []);

  const addTodo = async (e) => {
    e.preventDefault();
    let textContent = e.target.text.value;
    await axios.post(`http://localhost:4001/todo`, {
      textContent
    });
    getData();
    textContent = "";
  };

  return (
    <>
      <TextForm onSubmit={addTodo}>
        <TextInput name="text" />
      </TextForm>
    </>
  );
};

const TextForm = styled.form``;

const TextInput = styled.input`
  font-size: 3rem;
  border-radius: 10px;
  border: none;
`;

export default TodoInput;
