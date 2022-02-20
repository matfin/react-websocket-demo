export interface Payload {
  socket?: WebSocket | null;
  error?: Error | null;
}

export interface ConnectionAction {
  type: string;
  payload?: Payload;
}

export interface ConnectionState {
  socket: WebSocket | null;
  connected: boolean;
  error: Error | null;
}
