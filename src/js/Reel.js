import * as PIXI from 'pixi.js';
import { gsap } from 'gsap';

export class Reel {
  constructor(index, mechanics) {
    this.index = index;
    this.mechanics = mechanics;
    this.symbolHeight = 100;
    this.visibleSymbols = 5;
    this.totalSymbols = 200;

    // Reel container
    this.container = new PIXI.Container();

    // Symboler i en intern container som flyttes
    this.symbolContainer = new PIXI.Container();
    this.container.addChild(this.symbolContainer);

    // Tilføj symboler
    this.symbols = [];
    for (let i = 0; i < this.totalSymbols; i++) {
      const name = this.getRandomSymbol(index);
      const sprite = PIXI.Sprite.from(`/assets/images/${name}.png`);
      sprite.y = i * this.symbolHeight;
      sprite.width = 100;
      sprite.height = this.symbolHeight;
      this.symbolContainer.addChild(sprite);
      this.symbols.push({ name, sprite });
    }

    // Mask – kun 5 synlige symboler
    const mask = new PIXI.Graphics();
    mask.beginFill(0xffffff);
    mask.drawRect(0, 0, 100, this.visibleSymbols * this.symbolHeight);
    mask.endFill();

    this.container.addChild(mask);
    this.symbolContainer.mask = mask;

    // Position reel horisontalt
    this.container.x = index * 100;
  }

  // Symbolvalg (uden wild i reel 0)
  getRandomSymbol(reelIndex) {
    if (reelIndex === 0) {
      return this.mechanics.getRandomSymbolWithoutWild();
    }
    return this.mechanics.getRandomSymbol();
  }

  async spin(duration = 4) {
    // Start længere oppe og scroll ned
    this.symbolContainer.y = -this.symbolHeight * (this.totalSymbols - this.visibleSymbols);

    return new Promise(resolve => {
      gsap.to(this.symbolContainer, {
        y: 0,
        duration,
        ease: 'back.out(1.7)',
        onComplete: resolve
      });
    });
  }

  // Bruges til scatter-check fx
  getVisibleSymbols() {
    const result = [];
    for (let i = 0; i < this.visibleSymbols; i++) {
      const idx = this.totalSymbols - this.visibleSymbols + i;
      result.push(this.symbols[idx].name);
    }
    return result;
  }
}
