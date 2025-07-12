export interface CreateRoomRequest {
    room_name: string
}

export interface AddMessageRequest {
    room_name: string,
    username: string,
    message: string
}