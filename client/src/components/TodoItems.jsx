import React from "react";
import styled from "styled-components";
import TodoItem from "./TodoItem";

const TodoItems = ({ todoList, getData }) => {
  return (
    <Items>
      {todoList.map((list) => (
        <TodoItem key={list.id} list={list} getData={getData} />
      ))}
    </Items>
  );
};

const Items = styled.div`
  color: white;
  width: 80%;
  margin-top: 4rem;
`;

export default TodoItems;
