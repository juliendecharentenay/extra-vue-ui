class EventClick {
  
}

export class EventScroll {
  constructor(touch, delta, start_angle) {
    this.touch_       = touch;
    this.delta_       = delta;
    this.start_angle_ = start_angle;
  }

  get touch() { return this.touch_; }
  get delta() { return this.delta_; }

  static get LEFT()     { return 0; }
  static get TOP()      { return 1; }
  static get BTMRIGHT() { return 2; }
  get type() {
    if (this.start_angle_ <= -45.0) {
      return EventScroll.LEFT;
    } else if (this.start_angle_ <= 90.0) {
      return EventScroll.TOP;
    } else {
      return EventScroll.BTMRIGHT;
    }
  }
}

class EventPress {
}

class EventRelease {
}
