import { readDB } from "../../backendLibs/dbLib";

export default function roomRoute(req, res) {
  const rooms = readDB();

  // const newrooms = [];
  // for (const room of rooms) {
  //   newrooms.push({
  //     roomId: room.roomId,
  //     roomName: room.roomName,
  //   });
  // }  //ใช้ได้สองแบบ

  const newrooms = rooms.map((x) => ({
    roomId: x.roomId,
    roomName: x.roomName,
  }));

  return res.json({
    ok: true,
    newrooms,
  });
}
