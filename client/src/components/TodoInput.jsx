import React, { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";

const TodoInput = ({ getData }) => {
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    getData();
  }, []);

  const inputHandler = (e) => {
    setInputValue(e.target.value);
  };

  const addTodo = async (e) => {
    e.preventDefault();
    await axios.post(`http://localhost:4001/todo`, {
      textContent: inputValue
    });
    getData();
    setInputValue("");
  };

  return (
    <>
      <TextForm onSubmit={addTodo}>
        <TextInput
          autofocus="autofocus"
          onChange={inputHandler}
          value={inputValue}
          name="text"
        />
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
