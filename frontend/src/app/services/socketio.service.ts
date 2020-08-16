import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';

@Injectable({
  providedIn: 'root'
})
export class SocketioService {

  constructor(private socket: Socket) { }

  getInitialData() {
    return this.createObserver('initial')
  }

  getUpdateData() {
    return this.createObserver('update')
  }

  private createObserver(event: string) {
    return this.socket.fromEvent(event);
  }
}
