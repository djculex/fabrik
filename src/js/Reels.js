import * as PIXI from 'pixi.js';
import { Reel } from './Reel.js';

export class Reels {
  constructor(mechanics) {
    this.container = new PIXI.Container();
    this.mechanics = mechanics;
    this.reels = [];

    this.reelsCount = 5;

    for (let i = 0; i < this.reelsCount; i++) {
      const reel = new Reel(i, mechanics);
      this.container.addChild(reel.container);
      this.reels.push(reel);
    }
  }

  async spinAll() {
    // Spin alle reels samtidigt (starter)
    const spinPromises = this.reels.map(reel => reel.spin(4));

    // Men stop reel efter reel én ad gangen fra venstre
    for (let i = 0; i < this.reels.length; i++) {
      await spinPromises[i]; // vent til reel[i] er færdig
    }

    // Tæl scatters i synlige symboler
    const allVisibleSymbols = this.reels.map(r => r.getVisibleSymbols());
    const flatSymbols = allVisibleSymbols.flat();
    const scatterCount = flatSymbols.filter(s => s === 'scatter').length;

    return { matrix: allVisibleSymbols, scatterCount };
  }
}
