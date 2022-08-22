import React, { useEffect, useState } from 'react';
import axios from 'axios';

const TodoItem = ({ list, getData }) => {
  const [isModify, setIsModify] = useState(false);

  useEffect(() => {
    getData();
  }, []);

  const modifyItem = async () => {
    e.preventDefault();
    setIsModify(!isModify);
    await axios.put(`http://localhost:4001/todo/${list.id}`, {
      content,
    });
    getData();
  };

  const deleteItem = async () => {
    await axios.delete(`http://localhost:4001/todo/${list.id}`);
    getData();
  };

  return (
    <form onSubmit={modifyItem}>
      <div>할 일</div>
      {isModify ? <input name="text" /> : <div>{list?.content}</div>}
      <div>날짜</div>
      <div>{list?.updatedAt}</div>
      <div>했니?</div>
      <div>{list?.done}</div>
      {isModify ? <></> : <input type="submit" value="수정!" />}

      <button onClick={deleteItem}>삭제!</button>
    </form>
  );
};

export default TodoItem;
