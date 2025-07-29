import express, { Request, Response } from "express";
import { all_rooms } from "./data/store";
import { createTextMessage, createRoom } from "./types/factory";
import cors from "cors";
import multer from "multer";
import path from "path";

const app = express();
const port = 4000;

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

// Serve static files from "uploads" directory
app.use("/uploads", express.static(path.resolve("uploads")));

app.use(cors());
app.use(express.json()); // parse json body

// REST endpoints
app.get("/", (req: Request, res: Response) => {
  console.log("A request received at the test endpoint");
  res.json({ message: "Request received" });
});

// get all rooms
app.get("/all_rooms", (req: Request, res: Response) => {
  // return an array of all room names
  res.json(all_rooms.map((room) => room.name));
});

// create room
all_rooms.push(createRoom("General")); // default room
app.post("/room", (req: Request, res: Response) => {
  // console.log("Create new room request received");
  const { room_name } = req.body;
  if (!room_name) {
    return res
      .status(400)
      .json({ error: "room_name is required to create a room" });
  }

  // same room name shouldn't exist already
  if (all_rooms.some((room) => room.name === room_name)) {
    console.log("Room name already exists: ", room_name);
    return res.status(409).json({ error: "Room name already exists" });
  }

  // now create the room
  all_rooms.push(createRoom(room_name));
  res.json({ message: "Room created successfully" });
});

// send message on a room
app.post("/message", (req: Request, res: Response) => {
  const { room_name, username, message } = req.body;

  if (!room_name || !username || !message) {
    console.log(`Req: ${JSON.stringify(req.body)}`);
    return res
      .status(409)
      .json({ message: "room_name, username, message should be present!" });
  }

  if (!all_rooms.some((room) => room.name === room_name)) {
    return res.status(404).json({ message: "Room not found" });
  }

  if (message.length < 1) {
    return res.status(400).json({ message: "Message cannot be empty" });
  }

  // room exists and the message is addable
  all_rooms
    .find((r) => r.name === room_name)
    ?.messages.push(createTextMessage(username, message));
  res.json({ message: "Message added to room" });
});

// get all messages in a room
app.get("/allMessage/:roomname", (req: Request, res: Response) => {
  const room_name = req.params.roomname;

  if (!room_name) {
    return res.status(409).json({ message: "Room name cannot be empty" });
  }

  if (!all_rooms.some((room) => room.name === room_name)) {
    return res.status(404).json({ message: "Room not found" });
  }

  res.json(all_rooms.find((r) => r.name === room_name)?.messages);
});

// files upload
app.post(
  "/upload/:roomname",
  upload.single("file"),
  (req: Request, res: Response) => {
    const room_name = req.params.roomname;
    const username = req.body.username;

    const room = all_rooms.find((r) => r.name === room_name);
    if (!room) {
      return res.status(404).json({ error: "Room not found" });
    }

    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    if (!username) {
      return res.status(400).json({ error: "Username is required" });
    }

    // Add file message to the room's messages
    room.messages.push({
      type: "file",
      username,
      filename: req.file.filename,
      originalName: req.file.originalname,
      size: req.file.size,
      mimetype: req.file.mimetype,
      time: new Date().toISOString(),
    });

    res.json({
      message: "File uploaded successfully",
      fileUrl: `/uploads/${req.file.filename}`,
    });
  }
);

// start server
app.listen(port, () => {
  console.log(`Server is running at port ${port}`);
});
