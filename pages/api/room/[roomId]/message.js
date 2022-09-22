import { readDB, writeDB } from "../../../../backendLibs/dbLib";
import { v4 as uuidv4 } from "uuid";

export default function roomIdMessageRoute(req, res) {
  if (req.method === "GET") {
    const rooms = readDB();

    const id = req.query.roomId;
    const roomsIdx = rooms.findIndex((x) => x.roomId === id);
    if (roomsIdx === -1) {
      return res.status(404).json({ ok: false, message: "Invalid room id" });
    } else {
      const messages = [];
      for (const room of rooms) {
        if (room.roomId === id) {
          for (const messages1 of room.messages) {
            messages.push({
              messageId: messages1.messageId,
              text: messages1.text,
            });
          }
        }
      }
      return res.json({
        ok: true,
        messages,
      });
    }
  } else if (req.method === "POST") {
    const rooms = readDB();

    //read request body
    const text = req.body.text;

    //create new id
    const newId = uuidv4();

    const roomId = req.query.roomId;
    const room = rooms.find((x) => x.roomId === roomId);
    if (room === false) {
      return res.status(404).json({ ok: false, message: "Invalid room id" });
    } else {
      if (typeof text !== "string" && text.length <= 0) {
        return res
          .status(400)
          .json({ ok: false, message: "Invalid text input" });
      }
      // const message = {
      //   messageId: `${newId}`,
      //   text: `${text}`,
      // };
      room.messages.push({
        messageId: newId,
        text: text,
      });
      writeDB(rooms);
      return res.status(200).json({
        ok: true,
        message: {
          messageId: newId,
          text: text,
        },
      });
    }
  }
}
