import * as PIXI from 'pixi.js';
import { Reel } from './Reel.js';

export class Reels {
  constructor(mechanics) {
    this.container = new PIXI.Container();
    this.reels = [];
    this.mechanics = mechanics;

    this.reelsCount = 5;
    this.rowsCount = 5;

    for (let i = 0; i < this.reelsCount; i++) {
      const reel = new Reel(i, this.rowsCount, this.mechanics);
      reel.container.x = i * 100;
      this.container.addChild(reel.container);
      this.reels.push(reel);
    }
  }

  async spin() {
    for (const reel of this.reels) {
      await reel.spin();
    }
  }
}
