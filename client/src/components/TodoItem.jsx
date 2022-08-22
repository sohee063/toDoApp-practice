import React, { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";

const TodoItem = ({ list, getData }) => {
  const [isModify, setIsModify] = useState(false);
  const [modifyText, setModifyText] = useState("");

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
          <input name="text" onChange={modifyContent} />
        ) : (
          <div>{list?.content}</div>
        )}
      </Task>
      <div>{list?.done}</div>
      <Btn>
        <div>{list?.updatedAt}</div>
        <ModifyBtn
          onClick={(e) => {
            e.target.value = list.content;
            setIsModify(!isModify);
          }}
          type="submit"
          value="수정"
        />
        <DeleteBtn onClick={() => deleteItem(list.id)}>삭제</DeleteBtn>
      </Btn>
    </Item>
  );
};

const Item = styled.div`
  display: flex;
  margin: 1rem;
  justify-content: space-between;
  align-items: center;
  border: 1px solid white;
  border-radius: 2rem;
  padding: 1rem;
  background-color: rgba(94, 91, 91, 0.05);
  > div {
    margin: 1rem;
  }

  transition: 500ms;
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
