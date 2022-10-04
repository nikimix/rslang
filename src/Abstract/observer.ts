interface Listener {
  name: string;
  callback: (...params: string[]) => void;
}

export default class Observer {
  private listeners: Array<Listener> = [];

  add(name: string, callback: (...params: string[]) => void): void {
    this.listeners.push({ name, callback });
  }

  remove(name: string, callback: (...params: string[]) => void) {
    this.listeners.forEach((listener, idx) => {
      if (name === listener.name && callback === listener.callback) {
        this.listeners.splice(idx, 1);
      }
    });
  }

  dispatch(name: string, ...params: string[]): void {
    this.listeners.filter((it) => it.name === name).forEach((it) => it.callback(...params));
  }
}
