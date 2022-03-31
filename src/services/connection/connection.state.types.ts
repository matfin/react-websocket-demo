export interface Payload {
  socket?: WebSocket | null;
}

export interface ConnectionAction {
  type: string;
  payload?: Payload;
}

export interface ConnectionState {
  socket: WebSocket | null;
}
