import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import styled from "styled-components";

const TodoItem = ({ list, getData }) => {
  const [isModify, setIsModify] = useState(false);
  const [modifyText, setModifyText] = useState("");
  const [isDone, setIsDone] = useState(false);

  const modifyInput = useRef();

  useEffect(() => {
    getData();
  }, []);

  const modifyItem = async (e) => {
    setIsModify(!isModify);
    e.preventDefault();

    await axios.put(`http://localhost:4001/todo/${list.id}`, {
      content: modifyText
    });
    getData();
    modifyInput.current.focus();
  };

  const taskDone = () => {
    setIsDone(!isDone);
  };

  const modifyContent = (e) => {
    setModifyText(e.target.value);
  };

  const deleteItem = async (id) => {
    await axios.delete(`http://localhost:4001/todo/${id}`);
    getData();
  };

  return (
    <Item>
      <Task onSubmit={modifyItem}>
        {isModify ? (
          <input name="text" onChange={modifyContent} ref={modifyInput} />
        ) : (
          <TaskContent isDone={isDone} onClick={taskDone}>
            {list?.content}
          </TaskContent>
        )}
      </Task>
      <Btn>
        <div>{list?.updatedAt}</div>
        <ModifyBtn onClick={modifyItem} type="submit" value="Edit" />
        <DeleteBtn onClick={() => deleteItem(list.id)}>Del</DeleteBtn>
      </Btn>
    </Item>
  );
};

const Item = styled.div`
  font-family: "Hahmlet", serif;
  display: flex;
  margin: 1rem;
  justify-content: space-between;
  align-items: center;
  border: 1px solid white;
  border-radius: 2rem;
  padding: 1rem;
  background-color: rgba(94, 91, 91, 0.05);
  :hover {
    background-color: #dcd7d7;
    color: black;
    transition: 700ms;
    transform: translateY(-2px);
  }
`;

const TaskContent = styled.div`
  margin: 0.6rem;
  text-decoration: ${(props) => (props.isDone ? "line-through" : "none")};
`;

const Task = styled.form`
  font-size: 2rem;
  > input {
    font-size: 2rem;
    border-radius: 10px;
    border: none;
  }
`;

const Btn = styled.div`
  > div {
    margin-bottom: 1rem;
  }
`;

const ModifyBtn = styled.input`
  border: 2px solid #1a1a1a;
  border-radius: 15px;
  color: #3b3b3b;
  cursor: pointer;
  font-size: 1.2rem;
  min-height: 60px;
  padding: 1rem;
  text-align: center;
  transition: all 300ms cubic-bezier(0.23, 1, 0.32, 1);

  :hover {
    color: #fff;
    background-color: #e0be36;
    box-shadow: rgba(0, 0, 0, 0.25) 0 8px 15px;
    transform: translateY(-2px);
  }

  :active {
    transform: translateY(0);
  }
`;

const DeleteBtn = styled.button`
  border: 2px solid #1a1a1a;
  border-radius: 15px;
  color: #3b3b3b;
  cursor: pointer;
  font-size: 1.2rem;
  margin-left: 0.5rem;
  min-height: 60px;
  padding: 1rem;
  text-align: center;
  transition: all 300ms cubic-bezier(0.23, 1, 0.32, 1);

  :hover {
    color: #fff;
    background-color: #f714be;
    box-shadow: rgba(0, 0, 0, 0.25) 0 8px 15px;
    transform: translateY(-2px);
  }

  :active {
    transform: translateY(0);
  }
`;
export default TodoItem;
