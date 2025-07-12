import express, { Request, Response } from "express";
import { all_rooms } from "./data/store";
import { createMessage, createRoom } from "./types/factory";

const app = express();
const port = 4000;

app.use(express.json());    // parse json body

// REST endpoints
app.get('/', (req: Request, res: Response) => {
    console.log("A request received at the test endpoint");
    res.json({message: 'Request received'});
});

// get all rooms
app.get('/all_rooms', (req: Request, res: Response) => {
    // return an array of all room names
    res.json(all_rooms.map(room => room.name));
});

// create room
all_rooms.push(createRoom("gaming"));   // default room
app.post('/room', (req: Request, res: Response) =>{
    // console.log("Create new room request received");
    const { room_name } = req.body;
    if(!room_name) {
        return res.status(400).json({error: 'room_name is required to create a room'})
    }

    // same room name shouldn't exist already
    if(all_rooms.some(room => room.name === room_name)) {
        console.log('Room name already exists: ', room_name);
        return res.status(409).json({error: 'Room name already exists'});
    }

    // now create the room
    all_rooms.push(createRoom(room_name));
    res.json({message: 'Room created successfully'});

});

// send message on a room
app.post('/message', (req: Request, res: Response) => {
    const { room_name, username, message } = req.body;

    if(!room_name || !username || !message) {
        console.log(`Req: ${JSON.stringify(req.body)}`);
        return res.status(409).json({message: 'room_name, username, message should be present!'});
    }

    if(!all_rooms.some(room => room.name === room_name)) {
        return res.status(404).json({message: 'Room not found'});
    }

    if(message.length < 1) {
        return res.status(400).json({message: 'Message cannot be empty'});
    }

    // room exists and the message is addable
    all_rooms.find(r => r.name === room_name)?.messages.push(createMessage(username, message));
    res.json({message: "Message added to room"});
});

// get all messages in a room
app.get('/allMessage/:roomname', (req:Request, res: Response) => {
    const room_name = req.params.roomname;

    if(!room_name) {
        return res.status(409).json({message: 'Room name cannot be empty'});
    }

    if(!all_rooms.some(room => room.name === room_name)) {
        return res.status(404).json({message: 'Room not found'});
    }

    res.json(all_rooms.find(r => r.name === room_name)?.messages);

});



// start server
app.listen(port, () => {
    console.log(`Server is running at port ${port}`);
});
