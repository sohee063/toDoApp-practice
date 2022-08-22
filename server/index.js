const { data } = require('./data');
const todoData = data;
const shortid = require('shortid');

module.exports.todoSetting = {
  allList: (req, res) => {
    return res.status(200).json(todoData);
  },

  findList: (req, res) => {
    const { id } = req.params;
    const findListItem = todoData.find((item) => item.id === Number(id));
    if (findListItem) {
      return res.status(200).json(findListItem);
    } else {
      return res.status(404).send('찾는 결과가 없어요😅');
    }
  },

  createList: (req, res) => {
    const { content } = req.body;
    const id = shortid.generate();
    const newList = {
      id: id,
      createdAt: new Date().toISOString(),
      content: content,
      author: 'SOHEE',
    };
    todoData = { newList, ...todoData };
    return res.status(200).end();
  },

  modifyList: (req, res) => {
    const { id } = req.params;
    const index = todoData.findIndex((item) => item.id === Number(id));
    const modified = {
      ...todoData[index],
      ...req.body,
      updatedAt: new Date().toISOString(),
    };
    if (index > 0) {
      todoData.splice(index, 1, modified);
      return res.status(200).json(todoData);
    } else {
      return res.status(404).send('수정 할 수 없어요❗️');
    }
  },

  deleteList: (req, res) => {
    const { id } = req.params;
    const index = todoData.findIndex((item) => item.id === Number(id));
    if (index > 0) {
      todoData.splice(index, 1);
      return res.status(200).json(todoData);
    } else {
      return res.status(404).send('삭제 할 수 없어요❗️');
    }
  },
};
