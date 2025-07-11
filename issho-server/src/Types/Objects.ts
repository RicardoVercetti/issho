export type Message = {
    username: string,
    message: string,
    time: Date
}

export type Room = {
    name: string,
    messages: Message[]
};