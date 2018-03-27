interface Events {
  [eventName: string]: Array<Function>;
}

export default class Emitter {
  private events: Events;
  private scope: Object;
  constructor(scope: Object) {
    this.events = {};
    this.scope = scope || null;
  }
  private createEvent(eventName: string): this {
    const { events} = this;
    if (!events[eventName]) {
      events[eventName] = [];
    }
    return this;
  }
  private getEvent(eventName: string): Function[] {
    const { events } = this;
    return events[eventName] || null;
  }
  on(eventName: string, callback: Function): this {
    if (typeof callback !== 'function') {
      return this;
    }
    const { events } = this;
    if (!events[eventName]) {
      this.createEvent(eventName);
    }

    const callbacks = this.getEvent(eventName);
    callbacks.push(callback);

    return this;
  }
  async emit(eventName: string, ...args: any[]): Promise<any> {
    const callbacks = this.getEvent(eventName);

    if (!callbacks) {
      return this;
    }

    for(let i = 0; i < callbacks.length; ++i) {
      await callbacks[i].call(this.scope, ...args);
    }
  }
  off(eventName: string, callback: Function): this {
    const callbacks = this.getEvent(eventName);

    const index = callbacks.indexOf(callback);
    if (index !== -1) {
      callbacks.splice(index, 1);
    }

    return this;
  }
}