import axios from 'axios';

const ROOT_ENDPOINT = 'http://localhost:4000';

const doPost = (endP: string ,obj: any) => {
    axios.post(`${ROOT_ENDPOINT}/${endP}`, obj)
        .then(res => {
            console.log(`Res: ${JSON.stringify(res.data)}`);
        })
        .catch(err => console.log(`Error: ${err}, message: ${err?.response?.body}`));
}

const doGet = (endP: string) => {
    const full_str = `${ROOT_ENDPOINT}/${endP}`;
    // console.log(`full str: ${full_str}`);
    axios.get(full_str)
        .then(res => {
            console.log(`Res: ${JSON.stringify(res.data, null, 2)}`);
        })
        .catch(err => console.log(`Error: ${err}, message: ${err?.response?.body}`));
}

async function testConnection() {
    axios.get(`${ROOT_ENDPOINT}/`)
        .then(res => {
            console.log(`Resp : ${JSON.stringify(res.data)}`);
        })
        .catch((error => {
            console.log(`Error: ${error}`);
        }));
}

async function getAllRooms() {
    axios.get(`${ROOT_ENDPOINT}/all_rooms`)
        .then(res => {
            console.log(`Resp: ${JSON.stringify(res.data)}`);
        });
}

async function createRoom(room_name: string) {
    axios.post(`${ROOT_ENDPOINT}/room`, {room_name})
        .then(res => {
            console.log(`Res: ${JSON.stringify(res.data)}`);
        })
        .catch(err => console.log(`Error: ${err}`));
}

async function addMessage(room: string, user: string, message: string) {
    doPost('message', { room_name: room,
                        username: "user1",
                        message: message
    });
}

async function getAllMessages(room: string) {
    doGet(`allMessage/${room}`);
}


// testConnection();
// createRoom("Pythonistas");
// createRoom("Rustasians");
// getAllRooms();
// addMessage('gaming', 'user-2','Hi user-1');
getAllMessages('gaming');