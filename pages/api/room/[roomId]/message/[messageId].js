import { writeDB, readDB } from "../../../../../backendLibs/dbLib";

export default function roomIdMessageIdRoute(req, res) {
  //read value from URL
  const roomId = req.query.roomId;
  const messageId = req.query.messageId;
  if (req.method === "DELETE") {
    const rooms = readDB();

    const room = rooms.find((x) => x.roomId === roomId);
    if (room) {
      const messageIdx = room.messages.findIndex(
        (x) => x.messageId === messageId
      );
      if (messageIdx === -1) {
        return res
          .status(404)
          .json({ ok: false, message: "Invalid message id" });
      } else {
        room.messages.splice(messageIdx, 1);
        writeDB(rooms);
        return res.status(200).json({ ok: true });
      }
    } else {
      return res.status(404).json({ ok: false, message: "Invalid room id" });
    }
  }
}
