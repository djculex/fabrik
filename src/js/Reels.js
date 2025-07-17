import { Reel } from './Reel.js';
import * as PIXI from 'pixi.js';

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
    // Start alle reels spinner (varighed kan være den samme)
    const spinPromises = this.reels.map((reel) => reel.spin(2));

    // Stop dem en ad gangen, med delay mellem hver
    for (let i = 0; i < this.reels.length; i++) {
      await this.reels[i].spin(2 + i * 0.5); // længere varighed for reels til højre
    }

    // Tæl scatters på alle reels efter spin
    const allSymbols = this.reels.flatMap(reel => reel.symbols.map(s => s.symbol));
    const scatterCount = allSymbols.filter(s => s === 'scatter').length;
    console.log(`Antal scatter symboler: ${scatterCount}`);
  }
}
