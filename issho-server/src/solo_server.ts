import { createRoom, createMessage } from "./Types/Factory";

const new_room = createRoom("gaming");
const message = createMessage("Ballu","Hi there...");

console.log(`Room : ${JSON.stringify(new_room)}`);
console.log(`Msgs: ${JSON.stringify(message)}`);