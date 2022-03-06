/* istanbul ignore next */
export const openSocket = (uri: string): Promise<WebSocket> =>
  new Promise((resolve, reject): void => {
    const socket: WebSocket = new WebSocket(uri);

    socket.onopen = (): void => resolve(socket);
    socket.onerror = (e: Event): void => reject(e);
  });

/* istanbul ignore next */
export const closeSocket = (socket: WebSocket): Promise<void> =>
  new Promise((resolve): void => {
    socket.onclose = (): void => resolve();

    socket.close();
  });