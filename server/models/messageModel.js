const AppError = require("../utils/AppError");
const db = require("../db");

exports.getAllMessages = async () => {
  return (await db.query("select * from lifta_schema.message")).rows;
};

exports.getMessagesByChatId = async (chatId) => {
  const sender_id = chatId.sender_id;
  const receiver_id = chatId.receiver_id;
  const query = `select * from lifta_schema.message where (sender_id = $1 and receiver_id = $2) or (sender_id = $2 and receiver_id = $1) order by time`;
  return (await db.query(query, [sender_id, receiver_id])).rows;
};

exports.createMessage = async (message) => {
  const { sender_id, receiver_id, content, time } = message;
  const query = `insert into lifta_schema.message (sender_id, receiver_id, content, time,is_read) values ($1, $2, $3, $4, $5 ) returning *`;
  return (await db.query(query, [sender_id, receiver_id, content, time, false]))
    .rows[0];
};
