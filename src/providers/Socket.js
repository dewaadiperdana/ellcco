import io from 'socket.io-client';
import Config from 'react-native-config';

class Socket {
  static io;

  static connect() {
    Socket.io = io(Config.APP_URL);
  }
}

export default Socket;