import React, { useEffect, useState } from "react";
import axios from "axios";

const TodoItem = ({ list, getData }) => {
  const [isModify, setIsModify] = useState(false);
  const [modifyText, setModifyText] = useState("");

  useEffect(() => {
    getData();
  }, []);

  const modifyItem = async (e) => {
    e.preventDefault();
    setIsModify(!isModify);
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
    <>
      <form onSubmit={modifyItem}>
        <div>할 일</div>
        {isModify ? (
          <input name="text" onChange={modifyContent} />
        ) : (
          <div>{list?.content}</div>
        )}
        <div>날짜</div>
        <div>{list?.updatedAt}</div>
        <div>했니?</div>
        <div>{list?.done}</div>
        {isModify ? <></> : <input type="submit" value="수정!" />}
      </form>
      <button onClick={() => deleteItem(list.id)}>삭제!</button>
    </>
  );
};

export default TodoItem;
