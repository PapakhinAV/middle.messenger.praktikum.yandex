import EventBus from './eventBus';

export enum WSTransportEvents {
  Connected = 'connected',
  Error = 'error',
  Message = 'message',
  Close = 'close',
  Pong = 'pong'
}

export default class WSTransport extends EventBus {
  private socket: WebSocket | null = null;

  private pingInterval: number = 0;

  constructor(private url: string) {
    super();
  }

  public send(data: unknown) {
    if (!this.socket) {
      throw new Error('Socket is not connected');
    }

    this.socket.send(JSON.stringify(data));
  }

  public connect(): Promise<void> {
    this.socket = new WebSocket(this.url);

    this.subscribe(this.socket);

    this.setupPing();

    return new Promise((resolve) => {
      this.on(WSTransportEvents.Connected, () => {
        resolve();
      });
    });
  }

  public close() {
    this.socket?.close();
  }

  private setupPing() {
    // @ts-ignore
    this.pingInterval = setInterval(() => {
      this.send({ type: 'ping' });

      const pingTimeout = setTimeout(() => {
        console.log('Сервер не ответил на пинг-сообщение');
        this.reconnect();
      }, 5000);

      this.on(WSTransportEvents.Pong, () => {
        clearTimeout(pingTimeout);
      });

      this.on(WSTransportEvents.Close, () => {
        clearInterval(this.pingInterval);
        clearTimeout(pingTimeout);
        this.pingInterval = 0;
      });
    }, 30000);
  }

  private reconnect() {
    console.log('Повторное подключение...');
    clearInterval(this.pingInterval);
    this.pingInterval = 0;

    this.connect()
      .then(() => {
        console.log('Повторное подключение успешно выполнено');
      })
      .catch((error) => {
        console.log('Ошибка повторного подключения:', error);
      });
  }

  private subscribe(socket: WebSocket) {
    socket.addEventListener('open', () => {
      this.emit(WSTransportEvents.Connected);
    });
    socket.addEventListener('close', () => {
      this.emit(WSTransportEvents.Close);
    });

    socket.addEventListener('error', (e) => {
      this.emit(WSTransportEvents.Error, e);
    });

    socket.addEventListener('message', (message) => {
      const data = JSON.parse(message.data);

      if (data.type && data.type === 'pong') {
        this.emit(WSTransportEvents.Pong);
        return;
      }

      this.emit(WSTransportEvents.Message, data);
    });
  }
}
