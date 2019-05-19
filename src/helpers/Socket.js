import io from 'socket.io-client';

class Socket {
  static socket;

  static init() {
    Socket.socket = io('http://192.168.43.13:3000');
  }

  static emit(event, payload) {
    Socket.socket.emit(event, payload);
  }

  static onConnect(callback) {
    Socket.socket.on('connect', callback());
  }

  static on(event, callback) {
    Socket.socket.on(event, callback);
  }
}

export default Socket;