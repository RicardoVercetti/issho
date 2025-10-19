# 🗨️ Issho - The Simple Chat Server

## 📜 About

A simple Chat server similar to teams made for quick texting and file sharing like Microsoft Teams. No Signins, No passwords. Just enter user name to start using the server. All chats are classified under 'Rooms'. Anyone with a username can create rooms. Simply open a room to drop a message.

> 💡 **Note**: All the messages sent, rooms created & files shated are in-memory and disappears when you restart the server.

## 🤔 Why was this built?

- **Reason 1:** To understand the JS ideology of _'It might not be the most efficient solution, but it works'_ way of building things.
- **Reason 2:** Rarely, a short(1-2hrs) Ethernet/wifi issue makes local file sharing and simple texting hard at my office. Wanted to solve that problem with this experimental application.

## 🎯 Milestones

### ⛹️ Necessary

- Simple chat
- Drag and Drop file sharing(upto 2GB)

### 🤾 Luxury

- Voice calls
- Video calls

## 🐎 Run Locally

- Issho has a server built with Express.js backend and a React.js client
- You have to spin up the server first and then the client
- No database or whatsoever. Everything is in-memory

### ☀️ Setup the Server

1. Clone the repo

```bash
git clone https://github.com/RicardoVercetti/issho.git
```

2. go to the server directory

```bash
cd issho && cd issho-server
```

3. Install the dependencies

```bash
npm install
```

4. Run the project

```bash
npm run dev
```

### 🌕 Setup the client

1. go to client directory

```bash
cd issho-client
```

2. install all the dependencies

```bash
npm install
```

3. run the project

```bash
npm run dev
```

## 🧑‍💻 Authors/Contributors

- [Ricardo Vercet](https://github.com/RicardoVercetti)
