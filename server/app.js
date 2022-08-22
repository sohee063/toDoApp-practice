const express = require("express");
const app = express();
const port = 4001;
const getUid = require("get-uid");

const cors = require("cors");

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

let today = new Date();
let year = today.getFullYear();
let month = ("0" + (1 + today.getMonth())).slice(-2);
let day = ("0" + today.getDate()).slice(-2);
let date = `${year} - ${month} - ${day}`;

const todoList = [
  {
    id: 1,
    content: "코딩 공부하기",
    done: false,
    updatedAt: date
  }
];

app.get("/todo", (req, res) => {
  res.json(todoList);
});

app.get("/todo/:id", (req, res) => {
  return todoList;
});

app.post("/todo", (req, res) => {
  const { textContent, done } = req.body;
  todoList.unshift({
    id: getUid(),
    content: textContent,
    updatedAt: date,
    done
  });
  return res.send("todo 추가 성공❗️");
});

app.put("/todo/:id", (req, res) => {
  const { content } = req.body;
  const index = todoList.findIndex((item) => item.id == Number(req.params.id));
  const updated = {
    ...todoList[index],
    content,
    updatedAt: date
  };
  if (index !== -1) {
    todoList.splice(index, 1, updated);
    return res.status(200).json(todoList);
  } else {
    return res.status(404).send("삭제 할 수 없어요❗️");
  }
});

app.delete("/todo/:id", (req, res) => {
  const index = todoList.findIndex((item) => item.id == Number(req.params.id));
  todoList.splice(index, 1);
  return res.send("todo 삭제 성공❗️");
});

app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});
