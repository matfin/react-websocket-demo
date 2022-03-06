import WebSocket from 'ws';
import SocketController, { Metadata } from "./SocketController";

interface StockData {
  ask: number;
  bid: number;
  isin: string;
  price: number;
}

interface Message {
  subscribe?: string
  unsubscribe?: string
}

interface Intervals {
  [index: string]: NodeJS.Timer
}

const getRandomArbitraryInt = (min: number, max: number): number => {
  return Math.random() * (max - min) + min;
};

const dummyPayload = (isin: string): StockData => ({
  ask: getRandomArbitraryInt(200, 250),
  bid: getRandomArbitraryInt(220, 270),
  price: getRandomArbitraryInt(180, 230),
  isin,
});

const intervals: Intervals = {};

const controller = new SocketController(3001, (message: unknown, ws: WebSocket): void => {
  const messageData: Message = JSON.parse(message as string);
  const subscribeIsin: string = messageData.subscribe!;
  const unsubscribeIsin: string = messageData.unsubscribe!;
  
  if(!!messageData.subscribe) {
    intervals[subscribeIsin] = setInterval((): void => {
      const response: StockData = dummyPayload(subscribeIsin);

      ws.send(JSON.stringify(response));
    }, 500);
  }

  if(!!messageData.unsubscribe) {
    clearInterval(intervals[unsubscribeIsin]);
    delete intervals[unsubscribeIsin];
  }
});



