/**
 * 观察着类
 */
class Observer {
  addSubscriber(callback) {
    this.subscriber[this.subscriber.length] = callback;
  }
  removeSubscriber(callback) {
    if (callback) {
      const callIndex = this.subscriber.findIndex(cb => cb === callback );
      if (typeof callIndex === 'number') {
        this.subscriber.splice(callIndex, 1);
      }
    } else {
      this.subscriber.length = 0;
    }
  }
  publish(options) {
    this.subscriber.forEach(cb => cb(options));
  }
}
