import WebSocket, { WebSocketServer } from 'ws';
import { v4 as uuid } from 'uuid';

export interface Metadata {
  id: string
}

class SocketController {
  private server: WebSocketServer | null;
  private clients: Map<WebSocket, Metadata>;
  private port: number;
  private onMessage: (message: unknown, ws: WebSocket) => void

  constructor (port: number = 3000, onMessage: (message: unknown, ws: WebSocket) => void = (): void => {}) {
    this.port = port;
    this.server = new WebSocket.Server({ port: this.port });
    this.clients = new Map<WebSocket, Metadata>();

    this.onMessage = onMessage;
    this.server.on('connection', this.onConnection.bind(this));
  }

  private onConnection(ws: WebSocket): void {
    const id: string = uuid();
    const metadata: Metadata = { id };

    this.clients.set(ws, metadata);
    console.log(`Number of clients: ${this.clients.size}`);

    ws.on('message', (message: unknown) => this.onMessage(message, ws));
    ws.on('open', (): void => this.onOpen());
    ws.on('close', (): void => this.onClose(ws));
  }

  private onOpen(): void {
    console.log('onOpen');
  }

  private onClose(ws: WebSocket): void {
    this.clients.delete(ws);

    console.log('Closed', this.clients.values())
  }

  public closeAll() {
    [...this.clients.keys()].forEach((ws: WebSocket) => ws.close());
  }
}

export default SocketController;