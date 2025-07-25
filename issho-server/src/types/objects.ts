export type Message = {
    username: string,
    message: string,
    time: string
}

export type Room = {
    name: string,
    messages: Message[]
};