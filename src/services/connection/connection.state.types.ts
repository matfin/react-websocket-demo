export interface Payload {
  socket?: WebSocket | null;
  error?: Error | null;
  listening?: boolean;
}

export interface ConnectionAction {
  type: string;
  payload?: Payload;
}

export interface ConnectionState {
  socket: WebSocket | null;
  connected: boolean;
  listening: boolean;
  error: Error | null;
}
